import { z } from "zod";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { Shell } from "@/components/dashboard/shell";
import { getSession } from "@/actions/session";
import { defaultRedirectTo } from "@/config/pages";
import { HelpCallout } from "@/components/dashboard/help-callout";
import { redirect, Link } from "@/intl/navigation";

import { LoginForm } from "./_components/login-form";

/**
 * allowed URL search params
 */
const searchParamsSchema = z.object({
  redirectTo: z.string().optional().default(defaultRedirectTo),
});

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getSession();
  const search = searchParamsSchema.safeParse(searchParams);
  const t = await getTranslations("Auth.LoginPage");

  const redirectTo = search.success
    ? search.data.redirectTo
    : defaultRedirectTo;

  if (session.isLoggedIn) redirect(redirectTo);

  return (
    <Shell className="my-4 grid w-full max-w-xl gap-6 md:p-10">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-semibold text-3xl tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("noPayments")}</p>
      </div>
      <div className="grid gap-3">
        <Suspense>
          <LoginForm redirectTo={redirectTo} />
        </Suspense>
      </div>

      <HelpCallout />

      <p className="px-8 text-center text-muted-foreground text-sm">
        {t.rich("conditions", {
          terms: (chunks) => (
            <Link
              href="/legal/terms"
              className="underline underline-offset-4 hover:text-primary hover:no-underline"
            >
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link
              href="/legal/privacy"
              className="underline underline-offset-4 hover:text-primary hover:no-underline"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </Shell>
  );
}
