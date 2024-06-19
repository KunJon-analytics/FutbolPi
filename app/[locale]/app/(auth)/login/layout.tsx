import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

import { Link } from "@/intl/navigation";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function AuthLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Auth.Layout");

  return (
    <div className="grid min-h-screen grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      <aside className="col-span-1 flex w-full flex-col gap-4 border border-border p-4 backdrop-blur-[2px] xl:col-span-2 md:p-8">
        <Link href="/" className="relative h-8 w-8">
          <Icons.logo className="rounded-full border h-8 w-8 border-border" />
        </Link>
        <div className="flex w-full max-w-lg flex-1 flex-col justify-center gap-8 text-left">
          <div className="mx-auto grid gap-3">
            <h1 className="font-cal text-2xl text-foreground">{t("title")}</h1>
            <p className="text-muted-foreground">
              {t.rich("description", {
                br: () => <br />,
                pi: (chunks) => (
                  <a
                    href={siteConfig.links.piNetwork}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground underline underline-offset-4 hover:no-underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
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
