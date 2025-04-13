"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function MockDataButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleCreateMockData = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;
      if (!baseUrl) {
        throw new Error("Backend API base URL is not configured");
      }

      // 1. Create a partner
      const partnerRes = await fetch(`${baseUrl}/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test Partner",
          description: "A test partner created from mock data",
        }),
      });

      if (!partnerRes.ok) {
        const errorText = await partnerRes.text();
        throw new Error(`Partner creation failed: ${errorText}`);
      }
      const partner = await partnerRes.json();

      // 2. Create 6 rewards associated with the partner
      const rewards = await Promise.all(
        Array.from({ length: 6 }, (_, i) =>
          fetch(`${baseUrl}/rewards`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: `Reward ${i + 1}`,
              description: `Description for Reward ${i + 1}`,
              image: `https://example.com/reward${i + 1}.jpg`,
              discount: `${10 + i * 5}`,
              partner: partner._id,
            }),
          }).then(async (res) => {
            if (!res.ok) {
              const text = await res.text();
              console.error(`Reward ${i + 1} creation failed:`, text);
              return null;
            }
            return res.json();
          })
        )
      );

      console.log("Mock data created:", { partner, rewards });
      toast("✅ Mock data created successfully!");
      setStatus("✅ Mock data created successfully!");
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setStatus(`❌ Failed to create mock data: ${err.message}`);
        toast(`❌ Failed to create mock data: ${err.message}`);
      } else {
        setStatus("❌ Failed to create mock data: An unknown error occurred.");
        toast("❌ Failed to create mock data: An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleCreateMockData}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Mock Data"}
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}
