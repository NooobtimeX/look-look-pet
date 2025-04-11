import { Controller, Post, Body, Get } from "@nestjs/common";
import { RewardsService } from "./rewards.service";
import { CreateRewardDto } from "./dto/create-reward.dto";

@Controller("rewards")
export class RewardsController {
  constructor(private rewardsService: RewardsService) {}

  @Post()
  async createReward(@Body() createRewardDto: CreateRewardDto) {
    const reward = await this.rewardsService.create(createRewardDto);
    return reward;
  }

  @Get()
  async getRewards() {
    return this.rewardsService.findAll();
  }
}
