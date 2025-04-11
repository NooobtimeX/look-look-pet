export class CreateRewardDto {
  title: string;
  description: string;
  partnerId: number; // identifies which partner created the reward
}
