import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  let isRefreshValid = false;


  if (refreshToken) {
    try {
      const { payload } = await jose.jwtVerify(refreshToken, JWT_SECRET);
      if (payload.email === process.env.DEV_EMAIL) isRefreshValid = true;
    } catch (e) {
      console.log("Refresh Token Expired/Invalid");
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!isRefreshValid) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  if (pathname === "/login") {
    if ( isRefreshValid) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
