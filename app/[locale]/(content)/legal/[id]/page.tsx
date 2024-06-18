import { unstable_setRequestLocale } from "next-intl/server";

import { env } from "@/env.mjs";

import RemoteComponent from "../../_components/remote-component";

export function generateStaticParams() {
  return ["terms", "privacy"].map((id) => ({ id }));
}

type Props = { params: { locale: string; id: string } };

export default async function Page({ params: { id, locale } }: Props) {
  unstable_setRequestLocale(locale);

  const url = `${env.NEXT_PUBLIC_APP_URL}/assets/${locale}/content/legal/${id}.mdx`;

  return <RemoteComponent url={url} />;
}
