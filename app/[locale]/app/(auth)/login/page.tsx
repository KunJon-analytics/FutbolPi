import Link from "next/link";
import { z } from "zod";
import { Suspense } from "react";
import { redirect } from "next/navigation";

import { Shell } from "@/components/dashboard/shell";
import { getSession } from "@/actions/session";
import { defaultRedirectTo } from "@/config/pages";

import { LoginForm } from "./_components/login-form";
import { AlertWithButton } from "@/components/alert-components";
import { Button } from "@/components/ui/button";

/**
 * allowed URL search params
 */
const searchParamsSchema = z.object({
  redirectTo: z.string().optional().default(defaultRedirectTo),
  iPhone: z.string().optional(),
});

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getSession();
  const search = searchParamsSchema.safeParse(searchParams);
  const isIphone = search.success ? !!search.data.iPhone : false;
  const redirectTo = search.success
    ? search.data.redirectTo
    : defaultRedirectTo;

  if (session.isLoggedIn) redirect(redirectTo);

  return (
    <Shell className="my-4 grid w-full max-w-xl gap-6 md:p-10">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-semibold text-3xl tracking-tight">Sign In</h1>
        <p className="text-muted-foreground text-sm">
          Get started now. No Pi payments required.
        </p>
      </div>
      <div className="grid gap-3">
        <Suspense>
          <LoginForm redirectTo={redirectTo} />
        </Suspense>
      </div>

      {isIphone && (
        <AlertWithButton
          title="For iPhone Users!"
          description="To ensure full functionality of FutbolPi in the Pi Browser, please enable cookies on your device."
          button={
            <Button asChild variant={"outline"}>
              <Link href="/blog/iphone-enable-cookies">Guide</Link>
            </Button>
          }
        />
      )}

      <p className="px-8 text-center text-muted-foreground text-sm">
        By clicking continue, you agree to our{" "}
        <Link
          href="/legal/terms"
          className="underline underline-offset-4 hover:text-primary hover:no-underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/legal/privacy"
          className="underline underline-offset-4 hover:text-primary hover:no-underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </Shell>
  );
}
