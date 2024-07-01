export type BadgeCreateProps = {
  color: string;
  description: string;
  name: string;
  requiredPoints: number;
};

export const rookie: BadgeCreateProps = {
  color: "green",
  description:
    "Awarded to users who achieve their first 100 points on FutbolPi. You’re off to a great start!",
  name: "Rookie Scorer",
  requiredPoints: 100,
};

export const dynamo: BadgeCreateProps = {
  color: "blue",
  description:
    "Given to users who successfully refer the first 10 new users to FutbolPi. Keep spreading the word!",
  name: "Referral Dynamo",
  requiredPoints: 10,
};

export const startStriker: BadgeCreateProps = {
  color: "yellow",
  description:
    "Attained by users who reach 1000 points on FutbolPi. You’re a top scorer in our community!",
  name: "Star Striker",
  requiredPoints: 1000,
};

export const champion: BadgeCreateProps = {
  color: "red",
  description:
    "Reserved for competition winners on FutbolPi. Congratulations on your victory!",
  name: "Champion’s Crest",
  requiredPoints: 100,
};
