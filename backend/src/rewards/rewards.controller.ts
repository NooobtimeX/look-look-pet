import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { RewardsService } from "./rewards.service";
import { CreateRewardDto } from "./dto/create-reward.dto";
import { UsersService } from "../users/users.service"; // adjust the path as needed

@Controller("rewards")
export class RewardsController {
  constructor(
    private readonly rewardsService: RewardsService,
    private readonly usersService: UsersService // Inject UsersService here
  ) {}

  @Post()
  create(@Body() dto: CreateRewardDto) {
    return this.rewardsService.create(dto);
  }

  @Get()
  findAll() {
    return this.rewardsService.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.rewardsService.findById(id);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.rewardsService.delete(id);
  }

  // New endpoint for redeeming a reward.
  @Post("redeem/:rewardId")
  async redeem(
    @Param("rewardId") rewardId: string,
    @Body("userId") userId: string
  ) {
    // Verify that the reward exists.
    const reward = await this.rewardsService.findById(rewardId);
    if (!reward) {
      throw new NotFoundException("Reward not found");
    }
    // Redeem the reward for the given user.
    return this.usersService.redeemReward(userId, rewardId);
  }
}
