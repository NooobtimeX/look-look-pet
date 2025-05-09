// app/profile/page.tsx
import { cookies } from "next/headers";
import { decodeToken } from "@/lib/auth";
import React from "react";
import { Reward } from "@/types/reward";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  console.log("token:", token); // Debug log

  const decoded = token ? decodeToken(token) : null;
  const email = decoded?.email ?? "Guest";
  const userId = decoded?.sub;
  console.log("Decoded User ID:", userId); // Debug log

  let rewards: Reward[] = [];
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;
  console.log("Base URL:", baseUrl); // Debug log

  try {
    if (userId && token && baseUrl) {
      const res = await fetch(`${baseUrl}/users/${userId}/rewards`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      console.log("API response status:", res.status); // Debug log
      if (res.ok) {
        rewards = await res.json();
        console.log("Fetched rewards:", rewards); // Debug log
      } else {
        console.error("Failed to fetch rewards. Status:", res.status);
      }
    } else {
      console.error("Missing userId, token, or baseUrl.");
    }
  } catch (error) {
    console.error("Error fetching rewards:", error);
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-secondary tracking-tight">
          Profile
        </h1>
        <p className="text-xl">Welcome, {email}</p>
      </div>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Redeemed Rewards</h2>
        {rewards.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No rewards redeemed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {rewards.map((reward) => (
              <div
                key={reward._id}
                className="cursor-pointer transform hover:scale-105 transition duration-300"
              >
                <Card className="rounded-2xl gap-0 border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden p-0">
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
                    <p className="text-sm text-gray-500">
                      {reward.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
