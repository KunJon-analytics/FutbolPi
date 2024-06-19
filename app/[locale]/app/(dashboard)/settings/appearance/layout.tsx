import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

import { Header } from "@/components/dashboard/header";
import { getPageBySegment } from "@/config/pages";

type Props = { children: React.ReactNode; params: { locale: string } };

const page = getPageBySegment(["settings", "appearance"]);

export default function Layout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("PageTitles");

  return (
    <>
      <Header
        title={page?.title && t(`${page.title}.title`)}
        description={page?.title && t(`${page.title}.description`)}
      />
      {children}
    </>
  );
}
