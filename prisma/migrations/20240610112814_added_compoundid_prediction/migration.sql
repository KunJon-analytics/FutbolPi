/*
  Warnings:

  - A unique constraint covering the columns `[username,fixtureId]` on the table `Prediction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prediction_username_fixtureId_key" ON "Prediction"("username", "fixtureId");
