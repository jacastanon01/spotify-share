import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { accoundId } = req.body;
  return NextResponse.json(accoundId);
};
