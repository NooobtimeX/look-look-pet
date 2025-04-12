// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;
  const res = await fetch(`${baseUrl}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
