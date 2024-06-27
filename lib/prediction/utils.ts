import { env } from "@/env.mjs";

export type SocialCardProps = {
  round: string;
  competitionId: string;
  locale: string;
  homeTeam: string;
  homeGoal: number;
  awayTeam: string;
  awayGoal: number;
};

export const getSocialCardDialog = ({
  round,
  competitionId,
  homeTeam,
  awayTeam,
  awayGoal,
  homeGoal,
  locale,
}: SocialCardProps) => {
  return {
    title: "Share Your FutbolPi Prediction",
    message: `🔮 FutbolPi Prediction: ${round}

⚽ Home Team: ${homeTeam}
⚽ Away Team: ${awayTeam}

📊 My Prediction:
- ${homeGoal} - ${awayGoal}

🌐 Play on FutbolPi: ${env.NEXT_PUBLIC_APP_URL}/${locale}/app/competitions/${competitionId}/fixtures

Predict, score, and join the game! ⚽🔮🚀`,
  };
};
