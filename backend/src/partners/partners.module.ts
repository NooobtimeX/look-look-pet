import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Partner, PartnerSchema } from "./partner.schema";
import { PartnersController } from "./partners.controller";
import { PartnersService } from "./partners.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Partner.name, schema: PartnerSchema }]),
  ],
  controllers: [PartnersController],
  providers: [PartnersService],
  exports: [PartnersService],
})
export class PartnersModule {}
