// /app/api/rewards/redeem/[rewardId]/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// This POST handler receives the rewardId from the URL parameters and the userId from the request body.
export async function POST(
  request: Request,
  { params }: { params: { rewardId: string } }
) {
  // Extract the rewardId from the route parameters.
  const { rewardId } = params;

  // Parse the request body for the userId.
  const { userId } = await request.json();
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;

  // Forward the redeem request to the NestJS backend API.
  const res = await fetch(`${baseUrl}/rewards/redeem/${rewardId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  // If the backend returns an error, forward it to the client.
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to redeem reward" },
      { status: res.status }
    );
  }

  // Return the successful response data as JSON.
  const data = await res.json();
  return NextResponse.json(data);
}
