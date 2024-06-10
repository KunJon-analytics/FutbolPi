"use server";

import { canPredict, getOutcome } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { predictionInsertSchema } from "@/lib/prediction/schema";

import { getSession } from "./session";

export const predict = async (params: unknown) => {
  try {
    const parsedParam = predictionInsertSchema.safeParse(params);
    if (!parsedParam.success) {
      return { error: "Invalid Params" };
    }

    const session = await getSession();
    if (!session.isLoggedIn) {
      return { error: "Unauthorized" };
    }

    const { fixtureId, awayGoals, homeGoals } = parsedParam.data;

    const prevPrediction = await prisma.prediction.findUnique({
      where: { predictionId: { username: session.username, fixtureId } },
      select: { id: true },
    });
    if (!!prevPrediction?.id) {
      return { error: "Unauthorized" };
    }

    const fixture = await prisma.fixture.findUnique({
      where: { id: fixtureId },
      select: { timestamp: true },
    });
    if (!canPredict(fixture?.timestamp)) {
      return { error: "Unauthorized" };
    }

    const prediction = await prisma.prediction.create({
      data: {
        awayGoals,
        homeGoals,
        fixtureId,
        username: session.username,
        predictedOutcome: getOutcome(homeGoals, awayGoals),
      },
    });

    return { success: !!prediction.id };
  } catch (error) {
    console.log("PREDICT", error);
    return { error: "Server Error" };
  }
};
