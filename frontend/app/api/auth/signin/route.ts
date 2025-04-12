// app/api/auth/signin/route.ts
import { NextResponse } from "next/server";
import { API_URL } from "@/lib/api";

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${API_URL}/auth/signin`, {
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
