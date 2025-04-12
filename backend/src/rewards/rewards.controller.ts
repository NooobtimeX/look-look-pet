import { Controller, Post, Get, Body, Param, Delete } from "@nestjs/common";
import { RewardsService } from "./rewards.service";
import { CreateRewardDto } from "./dto/create-reward.dto";

@Controller("rewards")
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

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
}
