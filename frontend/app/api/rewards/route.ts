// app/api/rewards/route.ts
import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(`${API_URL}/rewards`);
    if (!res.ok) {
      const errText = await res.text();
      console.error("Failed to fetch rewards:", errText);
      return new NextResponse("Failed to fetch rewards", { status: 500 });
    }

    const rewards = await res.json();
    return NextResponse.json(rewards);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
