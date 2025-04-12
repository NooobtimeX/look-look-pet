// app/api/auth/signin/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;
  const res = await fetch(`${baseUrl}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  // ✅ set token in cookies for later use
  if (res.ok && data.access_token) {
    response.cookies.set("token", data.access_token, {
      path: "/",
      httpOnly: false, // ❗ must be false to read it in Next.js via cookies()
    });
  }

  return response;
}
