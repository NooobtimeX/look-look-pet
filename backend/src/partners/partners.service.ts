import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Partner } from "./partner.schema";
import { CreatePartnerDto } from "./dto/create-partner.dto";

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<Partner>
  ) {}

  async create(dto: CreatePartnerDto): Promise<Partner> {
    const partner = new this.partnerModel(dto);
    return partner.save();
  }

  async findAll(): Promise<Partner[]> {
    return this.partnerModel.find().exec();
  }

  async findOne(id: string): Promise<Partner> {
    const partner = await this.partnerModel.findById(id);
    if (!partner) throw new NotFoundException("Partner not found");
    return partner;
  }
  async delete(id: string): Promise<Partner | null> {
    return this.partnerModel.findByIdAndDelete(id);
  }
}
