import { Injectable } from "@nestjs/common";
import { CreatePartnerDto } from "./dto/create-partner.dto";
import { Partner } from "./entities/partner.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class PartnersService {
  private partners: Partner[] = [];

  async create(createPartnerDto: CreatePartnerDto): Promise<Partner> {
    const hashed = await bcrypt.hash(createPartnerDto.password, 10);
    const partner: Partner = {
      id: this.partners.length + 1,
      ...createPartnerDto,
      password: hashed,
      rewards: [],
    };
    this.partners.push(partner);
    return partner;
  }

  async findByUsername(username: string): Promise<Partner | undefined> {
    return this.partners.find((p) => p.username === username);
  }
}
