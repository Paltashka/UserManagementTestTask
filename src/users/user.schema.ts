import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ index: true })
  nameLower: string;

  @Prop({ index: true, unique: false })
  emailLower: string;

  @Prop({ index: true })
  phoneNormalized: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ emailLower: 1 });
UserSchema.index({ phoneNormalized: 1 });
UserSchema.index({ nameLower: 1 });
