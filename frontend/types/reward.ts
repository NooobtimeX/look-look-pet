import { Partner } from "./partner";

export interface Reward {
  _id: string;
  name: string;
  description: string;
  discount: string;
  partner: string | Partner; // can be populated or just an ID
}
