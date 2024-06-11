import * as z from "zod";

export const statsSchema = z.object({
  users: z.number(),
  fixtures: z.number(),
  predictions: z.number(),
});

export type StatsType = z.infer<typeof statsSchema>;

export const defaultStats: StatsType = {
  users: 0,
  fixtures: 0,
  predictions: 0,
};
