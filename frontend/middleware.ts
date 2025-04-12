import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/dashboard", "/rewards"]; // ✅ add /rewards here

  // Redirect to /signin if not signed in
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // Redirect to /dashboard if already signed in
  if (
    (pathname.startsWith("/signin") || pathname.startsWith("/signup")) &&
    token
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/rewards", "/signin", "/signup"], // ✅ include /rewards
};
