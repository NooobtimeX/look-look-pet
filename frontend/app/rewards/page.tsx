"use client";

import { useState, useEffect } from "react";
import { Reward } from "@/types/reward";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { RewardPopup } from "@/components/RewardPopup";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { decodeToken } from "@/lib/auth";
import { useIsSignedIn } from "@/lib/hooks/use-is-signed-in";
import { toast } from "sonner";

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
      .catch(() => toast("Failed to load rewards"));
  }, []);

  const handleCardClick = (reward: Reward) => {
    setSelected(reward);
    setPopupOpen(true);
  };

  const handleRedeem = async (rewardId: string) => {
    try {
      if (!isSignedIn) {
        toast("Please sign in to redeem a reward.");
        return;
      }

      const token = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("token="))
        ?.split("=")[1];
      if (!token) throw new Error("User not authenticated");

      const decodedUser = decodeToken(token);
      if (!decodedUser || !decodedUser.sub)
        throw new Error("Invalid token: missing user ID");

      const userId = decodedUser.sub;
      const res = await fetch(`/api/rewards/redeem/${rewardId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Failed to redeem reward");

      toast("Redeemed successfully!");
      setPopupOpen(false);
    } catch (err) {
      console.error(err);
      toast("Failed to redeem reward.");
    }
  };

  return (
    <div className="px-6 py-10 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold text-secondary tracking-tight mb-12 text-center">
        Explore Exclusive Rewards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {rewards.map((reward) => (
          <div
            key={reward._id}
            onClick={() => handleCardClick(reward)}
            className="cursor-pointer transform hover:scale-105 transition duration-300"
          >
            <Card className="rounded-2xl gap-0 border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden p-0">
              {/* Image flush with top & sides */}
              <img
                src="/Reward_placeholder.png"
                alt={reward.name}
                className="w-full h-auto object-cover"
              />
              <CardContent className="p-4">
                <CardTitle className="text-xl font-medium text-primary">
                  {reward.name}
                </CardTitle>
                <p className="text-secondary font-semibold">
                  {reward.discount}% OFF
                </p>
                <p className="text-sm text-gray-500">Tap for more details →</p>
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
