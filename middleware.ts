import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  //   const { pathName } = req.nextUrl;

  // Allow the request if following is true:
  // 1.) It's a request for nextauth session & provider fetching
  // 2.) the token exists
  if (req.nextUrl.pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
  // redirect them to login if they don't have a token AND are requesting a protected route
  if (!token) {
    // redirect("/api/auth/login")
    NextResponse.redirect("http://localhost:3000/api/auth/signin");
  }
}
