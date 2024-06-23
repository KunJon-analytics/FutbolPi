import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { defaultTopBallers } from "@/lib/site/stats";

export const revalidate = 3600;
// false | 0 | number

export async function GET(req: Request) {
  try {
    // Run all queries in parallel

    const result = await prisma.prediction.groupBy({
      by: ["username"],
      _sum: { points: true },
      _count: { username: true },
      orderBy: { _sum: { points: "desc" } },
      take: 5,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[GET_SITE_STATS]", error);
    return NextResponse.json(defaultTopBallers);
  }
}
