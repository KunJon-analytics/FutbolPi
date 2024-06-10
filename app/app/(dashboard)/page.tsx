import { redirect } from "next/navigation";

import { defaultRedirectTo } from "@/config/pages";

export default function Page() {
  return redirect(defaultRedirectTo);
}
