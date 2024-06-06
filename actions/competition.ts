"use server";

import { isAdmin } from "@/lib/utils";
import prisma from "@/lib/prisma";

import { getSession } from "./session";

export const deleteCompetition = async (competitionId: string) => {
  const session = await getSession();
  if (!isAdmin(session.username)) {
    throw new Error("Unauthorized");
  }
  const deletedCompetition = await prisma.competition.delete({
    where: { id: competitionId },
  });
  return { ok: !!deletedCompetition };
};

export const toggleActiveCompetition = async (competitionId: string) => {
  const session = await getSession();
  if (!isAdmin(session.username)) {
    throw new Error("Unauthorized");
  }
  const competition = await prisma.competition.findUniqueOrThrow({
    where: { id: competitionId },
    select: { isActive: true },
  });
  const updatedCompetition = await prisma.competition.update({
    where: { id: competitionId },
    data: { isActive: !competition.isActive },
  });
  return { ok: !!updatedCompetition };
};
