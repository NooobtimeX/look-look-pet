import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Reward } from "./reward.schema";
import { CreateRewardDto } from "./dto/create-reward.dto";

@Injectable()
export class RewardsService {
  constructor(@InjectModel(Reward.name) private rewardModel: Model<Reward>) {}

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward = new this.rewardModel(createRewardDto);
    return reward.save();
  }

  async findAll(): Promise<Reward[]> {
    return this.rewardModel.find().populate("partner").exec();
  }

  async findById(id: string): Promise<Reward | null> {
    return this.rewardModel.findById(id).populate("partner").exec();
  }

  async delete(id: string): Promise<Reward | null> {
    return this.rewardModel.findByIdAndDelete(id).exec();
  }
}
