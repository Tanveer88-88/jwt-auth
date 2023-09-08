import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { getJWTSecretKey } from "@/lib/auth";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  if (body.username === "admin" && body.password === "admin") {
    const jwt = await new SignJWT({
      username: body.username,
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1m")
      .sign(new TextEncoder().encode(getJWTSecretKey()));

      //console.log(jwt);

    cookies().set("user-token", jwt, {
      httpOnly: true,
    });

    return NextResponse.json({accessToken: jwt},{status: 200});
  }

  return NextResponse.json({ error: { Message: "Failed to Create Token" } }, { status: 401 });
};


// export const GET = async (request: NextRequest) => {
//   return NextResponse.json({ message: "APi is working" }, { status: 200 });
// }