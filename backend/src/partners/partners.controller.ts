import { Controller, Post, Body } from "@nestjs/common";
import { PartnersService } from "./partners.service";
import { CreatePartnerDto } from "./dto/create-partner.dto";

@Controller("partners")
export class PartnersController {
  constructor(private partnersService: PartnersService) {}

  @Post("register")
  async register(@Body() createPartnerDto: CreatePartnerDto) {
    const partner = await this.partnersService.create(createPartnerDto);
    return partner;
  }
}
