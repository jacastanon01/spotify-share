import { authOptions } from "@/lib/utils/authOptions";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  console.log("ROUTE");
  const session = await getServerSession(authOptions);
  const tokenJ = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  // console.log(token);
  const { type, timeRange, limit, token } = req.body;
  // const type = "track";
  // const timeRange = "long_term";
  // const limit = "10";

  const result = await fetch(
    `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await result.json();
  console.log(data);

  return NextResponse.json({ data });
};
