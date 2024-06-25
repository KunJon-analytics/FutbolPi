import { NextRequest, NextResponse } from "next/server";

import { getStats } from "./get-stat";

export async function GET(
  request: NextRequest,
  { params: { accessToken } }: { params: { accessToken: string } }
) {
  try {
    const predictions = await getStats(accessToken);
    return Response.json(predictions);
  } catch (error) {
    console.log("GET_PROFILE", error);
    return new NextResponse("Internal server error", { status: 400 });
  }
}
