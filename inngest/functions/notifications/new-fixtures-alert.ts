import { env } from "@/env.mjs";
import { inngest } from "@/inngest/client";

// Some function we'll call
export const newFixturesAlert = inngest.createFunction(
  { id: "new-fixtures-alert" },
  { event: "notifications/fixtures.new" },
  async ({ event, step }) => {
    const { competitions } = event.data;

    let message = `🚀 <b>Upcoming Fixtures!</b>\n\nGet ready for exciting predictions! ⚽️`;
    for (let index = 0; index < competitions.length; index++) {
      const competition = competitions[index];
      message = message.concat(
        `\n\n🏆 <b>Competition:</b> ${competition.competitionName}`
      );
      for (let j = 0; j < competition.fixtures.length; j++) {
        const fixture = competition.fixtures[j];
        message = message.concat(
          `\n - <b>${fixture.homeTeam}</b> vs. <b>${fixture.awayTeam}</b>`
        );
      }
    }

    message = message.concat(
      `\n\n<a href='${env.NEXT_PUBLIC_APP_URL}/en/app/competitions'>Predict now</a> and climb the leaderboard! 📈🔮\n\nBest regards,\nThe FutbolPi Team 🚀`
    );

    await step.sendEvent("send-new-fixtures-notification", {
      name: "notifications/telegram.send",
      data: { message, type: "BROADCAST" },
    });

    return true;
  }
);
