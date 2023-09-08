import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getJWTSecretKey } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // origin is domain name and pathname is the part of the URL that comes after the domain name
  const { pathname, origin } = request.nextUrl;

  const token = request.cookies.get("user-token")?.value;

  try {
    if (pathname === "/login" || pathname === "/register") {
      if (token) return NextResponse.redirect(`${origin}`);
      return NextResponse.next();
    }

    if (!token) return NextResponse.redirect(`http://localhost:3000/login`);

    const verifyToken = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecretKey())
    );

    if (verifyToken) {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: { Message: "Authentication Required" } },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
  }
}


export const config = {
  matcher : ["/","/login", "/protected"]
}