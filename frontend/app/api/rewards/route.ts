// /app/api/rewards/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/rewards`);
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch rewards" },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
