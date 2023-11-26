import { authOptions } from '@/lib/utils/authOptions';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  console.log('ROUTE', req.body);
  const session = await getServerSession(authOptions);
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  // console.log(token);
  const search = req.nextUrl.searchParams;
  console.log('SEARCH ', search);
  // const { searchType, timeRange, limit } = req.body;
  // const type = "track";
  // const timeRange = "long_term";
  // const limit = "10";

  const result = await fetch(
    `https://api.spotify.com/v1/me/top/${searchType}?time_range=${timeRange}_term&limit=${limit}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );

  const data = await result.json();
  console.log(data);

  return NextResponse.json({ data });
};
