import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export async function middleware(request) {
  const token = request?.cookies?.get("token")?.value;
  const redirectPath = `/login?back_url=${request.nextUrl.pathname}${request.nextUrl.search}`;
  if (!token && request.nextUrl.pathname !== "/login")
    return NextResponse.redirect(new URL(redirectPath, request.url));
  if (
    request.nextUrl.pathname === "/shipping" ||
    request.nextUrl.pathname === "/payment"
  ) {
    const cart = request.cookies.get("cart");
    const cartNumber = cart && cart?.value ? JSON.parse(cart.value).length : 0;
    if (cartNumber == 0)
      return NextResponse.redirect(new URL("/cart", request.url));
  }
  if (request.nextUrl.pathname === "/login") {
    if (token) return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: [
    "/orders",
    "/address",
    "/payment",
    "/profile",
    "/shipping",
    "/login",
  ],
};
