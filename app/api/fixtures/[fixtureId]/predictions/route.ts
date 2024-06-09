import { NextResponse } from "next/server";

import { getSession } from "@/actions/session";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { fixtureId: string } }
) {
  try {
    const session = await getSession();
    const { fixtureId } = params;

    if (!session.isLoggedIn) {
      console.log("[GET_PREDICTION]", "User not authenticated");
      return NextResponse.json(null);
    }

    const prediction = await prisma.prediction.findFirst({
      where: { username: session.username, fixtureId: parseInt(fixtureId) },
    });
    return NextResponse.json(prediction);
  } catch (error) {
    console.log("[GET_PREDICTION]", error);
    return NextResponse.json(null);
  }
}
