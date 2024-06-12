import Link from "next/link";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      <aside className="col-span-1 flex w-full flex-col gap-4 border border-border p-4 backdrop-blur-[2px] xl:col-span-2 md:p-8">
        <Link href="/" className="relative h-8 w-8">
          <Icons.logo className="rounded-full border h-8 w-8 border-border" />
        </Link>
        <div className="flex w-full max-w-lg flex-1 flex-col justify-center gap-8 text-left">
          <div className="mx-auto grid gap-3">
            <h1 className="font-cal text-2xl text-foreground">
              Unlock the Game: Sign In with Pi Network
            </h1>
            <p className="text-muted-foreground">
              Welcome to FutbolPi! To access our exclusive predictions and
              leaderboards, sign in using your Pi Network credentials via the Pi
              Browser. <br />
              <br />
              Don{"'"}t have Pi Browser yet? No worries!{" "}
              <a
                href={siteConfig.links.piNetwork}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-4 hover:no-underline"
              >
                Join Pi Network
              </a>{" "}
              and download the browser.
            </p>
          </div>
        </div>
        <div className="md:h-8" />
      </aside>
      <main className="container col-span-1 mx-auto flex items-center justify-center md:col-span-1 xl:col-span-3">
        {children}
      </main>
    </div>
  );
}
