// users.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserModel, UserDocument } from "./user.schema";
import * as bcrypt from "bcryptjs";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private configService: ConfigService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const saltRounds = parseInt(
      this.configService.get<string>("BCRYPT_SALT_ROUNDS") || "10",
      10
    );
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds
    );

    const createdUser = new this.userModel({
      email: createUserDto.email,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async getRedeemedRewards(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate("redeemedRewards");
    if (!user) throw new NotFoundException("User not found");
    return user.redeemedRewards;
  }

  // Updated function to redeem a reward for a user.
  async redeemReward(userId: string, rewardId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException("User not found");

    // Convert the string rewardId to a Mongoose ObjectId.
    const rewardObjectId = new Types.ObjectId(rewardId);

    // Check if the reward is already redeemed.
    if (
      user.redeemedRewards &&
      user.redeemedRewards.some((r: Types.ObjectId) => r.equals(rewardObjectId))
    ) {
      throw new ConflictException("Reward already redeemed");
    }

    if (!user.redeemedRewards) {
      user.redeemedRewards = [];
    }

    user.redeemedRewards.push(rewardObjectId);
    await user.save();
    return { message: "Reward redeemed successfully" };
  }
}
