import { Prisma } from "@prisma/client";
import * as z from "zod";

export const statsSchema = z.object({
  users: z.number(),
  fixtures: z.number(),
  predictions: z.number(),
});

export type StatsType = z.infer<typeof statsSchema>;

export const defaultStats: StatsType = {
  users: 134,
  fixtures: 54,
  predictions: 223,
};

export type TopBallers = (Prisma.PickEnumerable<
  Prisma.PredictionGroupByOutputType,
  "username"[]
> & {
  _count: {
    username: number;
  };
  _sum: {
    points: number | null;
  };
})[];

export const defaultTopBallers: TopBallers = [
  { username: "gshawn", _count: { username: 28 }, _sum: { points: 100 } },
  { username: "Dugalde1987", _count: { username: 46 }, _sum: { points: 99 } },
  {
    username: "harryelliott123",
    _count: { username: 25 },
    _sum: { points: 78 },
  },
  { username: "Tr1snoHart", _count: { username: 35 }, _sum: { points: 72 } },
  {
    username: "didier2yisenge",
    _count: { username: 20 },
    _sum: { points: 59 },
  },
];
