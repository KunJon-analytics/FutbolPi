/*
  Warnings:

  - Added the required column `predictedOutcome` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FixtureOutcome" AS ENUM ('HOME_WIN', 'AWAY_WIN', 'DRAW');

-- AlterTable
ALTER TABLE "Fixture" ADD COLUMN     "outcome" "FixtureOutcome";

-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "predictedOutcome" "FixtureOutcome" NOT NULL;
