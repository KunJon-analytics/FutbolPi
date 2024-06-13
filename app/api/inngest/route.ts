import { serve } from "inngest/next";

import { inngest } from "@/inngest/client";
import { cancelFixtures } from "@/inngest/functions/fixtures/cancel-fixtures";
import { completeFixtures } from "@/inngest/functions/fixtures/complete-fixture";
import { finishFixture } from "@/inngest/functions/fixtures/finish-fixture";
import { getFixtures } from "@/inngest/functions/fixtures/get-fixtures";
import { updateTodayFixtures } from "@/inngest/functions/fixtures/update-today-fixtures";
import { telegramMessage } from "@/inngest/functions/notifications/telegram-message";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    cancelFixtures,
    completeFixtures,
    finishFixture,
    getFixtures,
    updateTodayFixtures,
    telegramMessage,
  ],
});
