import { cookies } from "next/headers";
import { decodeToken } from "@/lib/auth";
import React from "react";

interface Reward {
  _id: string;
  name: string;
  description: string;
  discount: string;
  partner: {
    name: string;
  };
}

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const decoded = token ? decodeToken(token) : null;

  const email = decoded?.email ?? "Guest";
  const userId = decoded?.sub;

  let rewards: Reward[] = [];

  if (userId && token) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/rewards`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (res.ok) {
      rewards = await res.json();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4 text-lg">Welcome, {email}</p>

      <div className="mt-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Your Redeemed Rewards</h2>
        {rewards.length === 0 ? (
          <p>No rewards redeemed yet.</p>
        ) : (
          <ul className="space-y-4">
            {rewards.map((reward) => (
              <li
                key={reward._id}
                className="p-4 border rounded shadow bg-white"
              >
                <h3 className="text-xl font-bold">{reward.name}</h3>
                <p>{reward.description}</p>
                <p className="text-green-600 font-semibold">
                  {reward.discount}
                </p>
                <p className="text-sm text-gray-500">
                  From: {reward.partner?.name}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
