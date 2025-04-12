import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RewardsController } from "./rewards.controller";
import { RewardsService } from "./rewards.service";
import { Reward, RewardSchema } from "./reward.schema";
import { Partner, PartnerSchema } from "../partners/partner.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reward.name, schema: RewardSchema },
      { name: Partner.name, schema: PartnerSchema },
    ]),
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}
