"use server";

import { canPredict, getOutcome } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { predictionInsertSchema } from "@/lib/prediction/schema";

//obscure data by using accessToken but it is id of user

export const predict = async (params: unknown, accessToken: string) => {
  try {
    const parsedParam = predictionInsertSchema.safeParse(params);
    if (!parsedParam.success) {
      return { error: "Invalid Params" };
    }

    if (!accessToken) {
      return { error: "Unauthorized" };
    }

    const { fixtureId, awayGoals, homeGoals } = parsedParam.data;

    const prevPrediction = await prisma.prediction.findFirst({
      where: { fixtureId, user: { id: accessToken } },
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

    const updatedUser = await prisma.user.update({
      where: { id: accessToken },
      data: {
        predictions: {
          create: {
            awayGoals,
            homeGoals,
            fixtureId,
            predictedOutcome: getOutcome(homeGoals, awayGoals),
          },
        },
      },
    });

    return { success: !!updatedUser.id };
  } catch (error) {
    console.log("PREDICT", error);
    return { error: "Server Error" };
  }
};
