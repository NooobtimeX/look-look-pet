import { Partner } from "./partner";

export interface Reward {
  _id: string;
  name: string;
  description: string;
  discount: string;
  partner: Partner; // can be populated or just an ID
}
