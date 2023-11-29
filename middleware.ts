import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { authOptions } from './lib/utils/authOptions';

export async function middleware(req: NextRequest) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  // const session = getServerSession(authOptions);
  // console.log(token.accessToken, "**********");
  // console.log(req.body);
  //   const { pathName } = req.nextUrl;

  // Allow the request if following is true:
  // 1.) It's a request for nextauth session & provider fetching
  // 2.) the token exists
  if (req.nextUrl.pathname.includes('/api/auth') || token?.accessToken) {
    // const newHeaders = new Headers(req.headers);

    // const response = NextResponse.next({
    //   request: {
    //     headers: newHeaders,
    //   },
    // });

    // response.headers.set("Content-Type", "application/json");
    // response.headers.set("Authorization", `Bearer ${token.accessToken}`);
    // return response;
    return NextResponse.next();
  }

  // redirect them to login if they don't have a token AND are requesting a protected route
  if (!token) {
    // redirect("/api/auth/login")
    NextResponse.redirect('http://localhost:3000/api/auth/signin');
  }
}
