import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Partner extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
