import { Injectable } from "@nestjs/common";
import { CreateRewardDto } from "./dto/create-reward.dto";
import { Reward } from "./entities/reward.entity";

@Injectable()
export class RewardsService {
  private rewards: Reward[] = [];

  async create(createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward: Reward = {
      id: this.rewards.length + 1,
      ...createRewardDto,
    };
    this.rewards.push(reward);
    return reward;
  }

  async findAll(): Promise<Reward[]> {
    return this.rewards;
  }
}
