import Link from "next/link";

import { defaultRedirectTo } from "@/config/pages";

import { Button } from "../ui/button";

interface InBetweenCTAProps {
  description: string;
  actions: Record<
    "primary" | "secondary",
    { label: string; href: string; target?: string }
  >;
}

export function InBetweenCTA({ description, actions }: InBetweenCTAProps) {
  const { primary, secondary } = actions;
  return (
    <div className="my-8 flex flex-col items-center justify-between gap-6">
      <p className="max-w-lg text-center text-lg text-muted-foreground">
        {description}
      </p>
      <div className="flex gap-2">
        <Button className="rounded-full" asChild>
          <Link href={primary.href} target={primary.target}>
            {primary.label}
          </Link>
        </Button>
        <Button className="rounded-full" variant="outline" asChild>
          <Link href={secondary.href} target={secondary.target}>
            {secondary.label}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function MiddleCTA() {
  return (
    <InBetweenCTA
      description="Sick of booking a demo to know more? Test your endpoint or check our public dashboard right away."
      actions={{
        primary: { label: "Public Dashboard", href: "/public/monitors/1" },
        secondary: { label: "Speed Checker", href: "/play/checker" },
      }}
    />
  );
}

export function BottomCTA() {
  return (
    <InBetweenCTA
      description=" Invite your friends to FutbolPi and battle it out in match predictions. The more, the merrier! 🚀⚽️"
      actions={{
        primary: { label: "Invite Friends", href: "/app/login" },
        secondary: {
          label: "Start Predicting",
          href: defaultRedirectTo,
        },
      }}
    />
  );
}
