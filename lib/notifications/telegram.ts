import { env } from "@/env.mjs";
import axios from "axios";

export const telegramClient = axios.create({
  baseURL: "https://api.telegram.org",
  timeout: 10000,
});

const privateChannel = env.TELEGRAM_PRIVATE_CHANNEL;
const publicChannel = env.TELEGRAM_PUBLIC_CHANNEL;

export type TelegramEventType = "BUG_REPORT" | "DEV_MODE" | "BROADCAST";

export const getTelegramChannel = (type: TelegramEventType): string => {
  switch (type) {
    case "BROADCAST":
      return publicChannel;
    case "DEV_MODE":
      return privateChannel;
    case "BUG_REPORT":
      return privateChannel;

    default:
      return privateChannel;
  }
};

export const fixtureReminder = `<b>⚽️ FutbolPi Match Prediction Reminder!</b>

🔔 Attention, FutbolPi Predictors!

You have <b>1 hour left</b> to make your predictions for the upcoming matches:

🏆 Fixtures: `;
