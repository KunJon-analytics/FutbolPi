import { unstable_setRequestLocale } from "next-intl/server";

import { redirect } from "@/intl/navigation";

type Props = {
  params: { locale: string };
};

export default function SettingsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return redirect("/app/settings/user");
}
