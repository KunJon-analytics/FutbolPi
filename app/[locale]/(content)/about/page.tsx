import { unstable_setRequestLocale } from "next-intl/server";

import { env } from "@/env.mjs";

import RemoteComponent from "../_components/remote-component";

type Props = { params: { locale: string } };

export default async function AboutPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...

  const url = `${env.NEXT_PUBLIC_APP_URL}/assets/${locale}/content/about-page.mdx`;

  return <RemoteComponent url={url} />;
}
