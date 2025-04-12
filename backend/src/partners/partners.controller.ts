import { Controller, Post, Get, Param, Body, Delete } from "@nestjs/common";
import { PartnersService } from "./partners.service";
import { CreatePartnerDto } from "./dto/create-partner.dto";

@Controller("partners")
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  create(@Body() dto: CreatePartnerDto) {
    return this.partnersService.create(dto);
  }

  @Get()
  findAll() {
    return this.partnersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.partnersService.findOne(id);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.partnersService.delete(id);
  }
}
