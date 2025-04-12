"use client";

import { useState, useEffect } from "react";
import { Reward } from "@/types/reward";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RewardPopup } from "@/components/RewardPopup";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { decodeToken } from "@/lib/auth";
import { useIsSignedIn } from "@/lib/hooks/use-is-signed-in";

export default function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [selected, setSelected] = useState<Reward | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isSignedIn = useIsSignedIn();

  useEffect(() => {
    fetch("/api/rewards", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rewards");
        return res.json();
      })
      .then(setRewards)
      .catch(() => alert("Failed to load rewards"));
  }, []);

  const handleCardClick = (reward: Reward) => {
    setSelected(reward);
    setPopupOpen(true);
  };

  const handleRedeem = async (rewardId: string) => {
    try {
      if (!isSignedIn) {
        alert("Please sign in to redeem a reward.");
        return;
      }

      // Retrieve the token from document.cookie
      const token = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("token="))
        ?.split("=")[1];
      if (!token) throw new Error("User not authenticated");

      // Decode the token to extract the user ID
      const decodedUser = decodeToken(token);
      if (!decodedUser || !decodedUser.sub)
        throw new Error("Invalid token: missing user ID");
      const userId = decodedUser.sub;

      // Redeem the reward by calling the Next.js API route
      const res = await fetch(`/api/rewards/redeem/${rewardId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Failed to redeem reward");

      alert("Redeemed successfully!");
      setPopupOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to redeem reward.");
    }
  };

  return (
    <div className="px-6 py-10 max-w-screen-xl mx-auto">
      <h1 className="text-3xl text-secondary font-semibold tracking-tight mb-10 text-center">
        Explore Exclusive Rewards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div
            key={reward._id}
            onClick={() => handleCardClick(reward)}
            className="cursor-pointer"
          >
            <Card className="rounded-2xl border border-muted shadow-sm hover:shadow-md transition-shadow bg-background">
              <CardHeader>
                <CardTitle className="text-xl font-medium text-primary group-hover:underline">
                  {reward.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p className="text-secondary font-medium">
                  {reward.discount}% OFF
                </p>
                <p className="text-xs text-muted-foreground">
                  Tap for more details →
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <RewardPopup
        reward={selected}
        isMobile={isMobile}
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onRedeem={handleRedeem}
      />
    </div>
  );
}
