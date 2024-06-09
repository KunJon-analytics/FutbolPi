import { Prediction } from "@prisma/client";
import * as z from "zod";

export const predictionInsertSchema = z.object({
  fixtureId: z.number().int("Wrong fixtureId type"),
  awayGoals: z.number().int("Wrong awayGoals type"),
  homeGoals: z.number().int("Wrong homeGoals type"),
});

export type PredictionInsertSchema = z.infer<typeof predictionInsertSchema>;

export const getPrediction = async (fixtureId: number) => {
  return (
    await fetch(`/api/fixtures/${fixtureId}/predictions`)
  ).json() as unknown as Prediction | null;
};
