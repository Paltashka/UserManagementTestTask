import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRandomUtil } from './util/user-random.util';
import { User, UserDocument } from './user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(UserSeeder.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly config: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.userModel.estimatedDocumentCount();
    if (count > 0) {
      this.logger.log(`Users exist: ~${count}. Seeding skipped.`);
      return;
    }

    const TARGET_SIZE = this.config.get<number>('seed.usersTarget')!;
    const BATCH_SIZE = this.config.get<number>('seed.usersBatch')!;

    this.logger.warn(`DB is empty. Seeding ${TARGET_SIZE} users...`);

    let inserted = 0;

    while (inserted < TARGET_SIZE) {
      const batchSize = Math.min(BATCH_SIZE, TARGET_SIZE - inserted);
      const docs = Array.from({ length: batchSize }).map(() => {
        const name = UserRandomUtil.randomName();
        const email = UserRandomUtil.randomEmail(name);
        const phone = UserRandomUtil.randomPhone();
        const birthDate = UserRandomUtil.randomBirthDate();

        return {
          name,
          email,
          phone,
          birthDate,
          nameLower: UserRandomUtil.normalizeLower(name),
          emailLower: UserRandomUtil.normalizeLower(email),
          phoneNormalized: UserRandomUtil.normalizePhone(phone),
        };
      });

      await this.userModel.insertMany(docs, { ordered: false });

      inserted += batchSize;
      if (inserted % (BATCH_SIZE * 5) === 0 || inserted === TARGET_SIZE) {
        this.logger.log(`Seed progress: ${inserted}/${TARGET_SIZE}`);
      }
    }

    this.logger.warn(`Seeding done: ${TARGET_SIZE} users created.`);
  }
}
