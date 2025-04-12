// src/users/user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class UserModel {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  username?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Reward" }], default: [] })
  redeemedRewards: Types.ObjectId[]; // Or: Reward[] if using `populate`
}

// 👇 Add <Types.ObjectId> generic to Document to fix `_id` type
export type UserDocument = Document<Types.ObjectId, object, UserModel> &
  UserModel;

export const UserSchema = SchemaFactory.createForClass(UserModel);
