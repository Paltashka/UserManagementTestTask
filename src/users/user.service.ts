import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersQueryDto } from './dto/get-users.query.dto';
import { UserRandomUtil } from './util/user-random.util';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async addUser(dto: CreateUserDto) {
    const name = dto.name?.trim() || UserRandomUtil.randomName();
    const email = dto.email?.trim() || UserRandomUtil.randomEmail(name);
    const phone = dto.phone?.trim() || UserRandomUtil.randomPhone();
    const birthDate = dto.birthDate
      ? new Date(dto.birthDate)
      : UserRandomUtil.randomBirthDate();

    const doc = await this.userModel.create({
      name,
      email,
      phone,
      birthDate,
      nameLower: UserRandomUtil.normalizeLower(name),
      emailLower: UserRandomUtil.normalizeLower(email),
      phoneNormalized: UserRandomUtil.normalizePhone(phone),
    });

    this.logger.log(
      `User created: ${doc._id.toString()} ${doc.email} ${doc.phone}`,
    );
    return {
      _id: doc._id,
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      birthDate: doc.birthDate,
    };
  }

  async getUserById(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('User not found');
    const user = await this.userModel
      .findById(id)
      .select('_id name email phone birthDate')
      .lean();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getUsers(query: GetUsersQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    const escapeRegex = (value: string) =>
      value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (query.name?.trim()) {
      const q = UserRandomUtil.normalizeLower(query.name);
      filter.nameLower = { $regex: escapeRegex(q), $options: 'i' };
    }

    if (query.email?.trim()) {
      const q = UserRandomUtil.normalizeLower(query.email);
      filter.emailLower = { $regex: escapeRegex(q), $options: 'i' };
    }

    if (query.phone?.trim()) {
      const q = UserRandomUtil.normalizePhone(query.phone);
      if (q.length > 0) {
        filter.phoneNormalized = { $regex: escapeRegex(q) };
      }
    }

    const [items, total] = await Promise.all([
      this.userModel
        .find(filter)
        .select('_id name email phone birthDate')
        .sort({ _id: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.userModel.countDocuments(filter),
    ]);

    return {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      items,
    };
  }
}
