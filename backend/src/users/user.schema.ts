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

  @Prop({ type: [String], default: [] })
  rewards?: string[];
}

// 👇 Add <Types.ObjectId> generic to Document to fix `_id` type
export type UserDocument = Document<Types.ObjectId, {}, UserModel> & UserModel;

export const UserSchema = SchemaFactory.createForClass(UserModel);
