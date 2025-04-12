// app/api/mock-data/route.ts
import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    // 1. Create partner
    const partnerRes = await fetch(`${API_URL}/partners`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Partner",
        description: "A test partner created from mock data",
      }),
    });

    if (!partnerRes.ok) {
      const errorText = await partnerRes.text();
      console.error("Partner creation failed:", errorText);
      throw new Error("Failed to create partner");
    }

    const partner = await partnerRes.json();

    // 2. Create 6 rewards
    const rewards = await Promise.all(
      Array.from({ length: 6 }, (_, i) =>
        fetch(`${API_URL}/rewards`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `Reward ${i + 1}`,
            description: `Description for Reward ${i + 1}`,
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

    return NextResponse.json({ partner, rewards });
  } catch (err) {
    console.error("Mock data error:", err);
    return new NextResponse("Failed to create mock data", { status: 500 });
  }
}
