// app/api/rewards/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`${API_URL}/rewards/${params.id}`);

    if (!res.ok) {
      const errText = await res.text();
      console.error("Error fetching reward:", errText);
      return new NextResponse("Failed to fetch reward", { status: 500 });
    }

    const reward = await res.json();
    return NextResponse.json(reward);
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
