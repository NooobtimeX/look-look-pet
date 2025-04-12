// app/api/users/[id]/rewards/route.ts
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("authorization");
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;

  try {
    const res = await fetch(`${baseUrl}/users/${params.id}/rewards`, {
      headers: {
        Authorization: token || "",
      },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
