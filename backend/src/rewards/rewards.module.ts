import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RewardsController } from "./rewards.controller";
import { RewardsService } from "./rewards.service";
import { Reward, RewardSchema } from "./reward.schema";
import { Partner, PartnerSchema } from "../partners/partner.schema";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reward.name, schema: RewardSchema },
      { name: Partner.name, schema: PartnerSchema },
    ]),
    UsersModule, // Import UsersModule to use UsersService
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}
