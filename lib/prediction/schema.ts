import * as z from "zod";

export const predictionInsertSchema = z.object({
  fixtureId: z.number().int("Wrong fixtureId type"),
  awayGoals: z.coerce.number().int().nonnegative(),
  homeGoals: z.coerce.number().int().nonnegative(),
});

export type PredictionInsertSchema = z.infer<typeof predictionInsertSchema>;
