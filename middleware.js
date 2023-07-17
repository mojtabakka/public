import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export async function middleware(request) {
  const token = request?.cookies?.get("token")?.value;
  const redirectPath = `/login?back_url=${request.nextUrl.pathname}${request.nextUrl.search}`;
  if (!token) return NextResponse.redirect(new URL(redirectPath, request.url));
}
export const config = {
  matcher: ["/orders", "/address", "/payment", "/profile", "/shipping"],
};
