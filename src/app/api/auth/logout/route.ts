import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
    redirectUrl: "/",
  });

  // Expire and clear the session cookie
  response.cookies.set("plugd_access_key", "", {
    path: "/",
    httpOnly: false,
    maxAge: 0,
    expires: new Date(0),
    sameSite: "lax",
  });

  return response;
}

export async function GET(req: Request) {
  const response = NextResponse.redirect(new URL("/", req.url));

  response.cookies.set("plugd_access_key", "", {
    path: "/",
    httpOnly: false,
    maxAge: 0,
    expires: new Date(0),
    sameSite: "lax",
  });

  return response;
}
