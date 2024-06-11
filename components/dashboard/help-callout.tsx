import { HelpCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function HelpCallout() {
  return (
    <Alert className="max-w-md">
      <HelpCircle className="h-4 w-4" />
      <AlertTitle className="">Need help?</AlertTitle>
      <AlertDescription className="text-muted-foreground">
        Let us know by joining our{" "}
        <a
          href="/telegram"
          target="_blank"
          className="font-medium text-foreground underline hover:no-underline"
          rel="noreferrer"
        >
          Telegram
        </a>
        .
      </AlertDescription>
    </Alert>
  );
}
