// app/api/users/[id]/rewards/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("authorization");
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_API || "http://localhost:3001";

  try {
    const res = await fetch(`${backendUrl}/users/${params.id}/rewards`, {
      headers: {
        Authorization: token || "",
      },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
