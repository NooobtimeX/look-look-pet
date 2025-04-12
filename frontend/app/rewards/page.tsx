import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reward } from "@/types/reward";

async function getRewards(): Promise<Reward[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/rewards`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch rewards");

  return res.json();
}

export default async function RewardsPage() {
  const rewards = await getRewards();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Rewards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <Card key={reward._id} className="w-full">
            <CardHeader>
              <CardTitle>{reward.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>{reward.description}</p>
              <p className="text-blue-600">Discount: {reward.discount}%</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
