import { useTranslations } from "next-intl";

import { Link } from "@/intl/navigation";

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
  const t = useTranslations("Index.BottomCTA");

  return (
    <InBetweenCTA
      description={t("description")}
      actions={{
        primary: {
          label: t("primaryAction.label"),
          href: "/app/competitions",
        },
        secondary: {
          label: t("secondaryAction.label"),
          href: "/app/competitions",
        },
      }}
    />
  );
}
