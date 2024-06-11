import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { StatsType, defaultStats } from "@/lib/site/stats";

export async function GET(req: Request) {
  try {
    // Run all queries in parallel
    const [users, fixtures, predictions] = await Promise.all([
      prisma.user.count(),
      prisma.fixture.count(),
      prisma.prediction.count(),
    ]);

    const result: StatsType = { users, fixtures, predictions };

    return NextResponse.json(result);
  } catch (error) {
    console.log("[GET_SITE_STATS]", error);
    return NextResponse.json(defaultStats);
  }
}
