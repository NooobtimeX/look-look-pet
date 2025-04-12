// /app/api/rewards/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Backend API base URL is not defined" },
      { status: 500 }
    );
  }

  // Use URL constructor to correctly form the full URL
  const url = new URL("/rewards", baseUrl);

  const res = await fetch(url.toString());
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch rewards" },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
