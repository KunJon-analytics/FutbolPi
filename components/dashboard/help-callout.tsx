import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function HelpCallout() {
  const t = useTranslations("HelpCallOut");

  return (
    <Alert className="max-w-md">
      <HelpCircle className="h-4 w-4" />
      <AlertTitle className="">{t("title")}</AlertTitle>
      <AlertDescription className="text-muted-foreground">
        {t.rich("description", {
          telegram: (chunks) => (
            <a
              href="/telegram"
              target="_blank"
              className="font-medium text-foreground underline hover:no-underline"
              rel="noreferrer"
            >
              {chunks}
            </a>
          ),
        })}
      </AlertDescription>
    </Alert>
  );
}
