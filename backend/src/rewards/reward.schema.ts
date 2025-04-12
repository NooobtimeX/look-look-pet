import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Partner } from "../partners/partner.schema";

@Schema({ timestamps: true })
export class Reward extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  discount: string;

  @Prop({ type: Types.ObjectId, ref: Partner.name, required: true })
  partner: Types.ObjectId;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
