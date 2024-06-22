import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params: { accessToken } }: { params: { accessToken: string } }
) {
  try {
    const predictions = await prisma.prediction.aggregate({
      where: { user: { accessToken } },
      _count: { id: true },
      _sum: { points: true },
    });
    return Response.json(predictions);
  } catch (error) {
    console.log("GET_PROFILE", error);
    return new NextResponse("Internal server error", { status: 400 });
  }
}
