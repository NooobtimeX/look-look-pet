// src/users/users.service.ts
import { Injectable, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
    // Check if email is already used
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    // Get salt rounds from environment or default to 10 if not set
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
}
