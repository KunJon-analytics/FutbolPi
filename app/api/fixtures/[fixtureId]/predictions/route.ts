import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { fixtureId: string } }
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("token");
    // id is "hello" for /api/search?token=hello

    if (!id) {
      console.log("[GET_PREDICTION]", "Invalid authentication params");
      return NextResponse.json(null);
    }
    const { fixtureId } = params;

    const prediction = await prisma.prediction.findFirst({
      where: { fixtureId: parseInt(fixtureId), user: { id } },
    });
    return NextResponse.json(prediction);
  } catch (error) {
    console.log("[GET_PREDICTION]", error);
    return NextResponse.json(null);
  }
}
