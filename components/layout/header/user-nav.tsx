import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

import { getSession } from "@/actions/session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserAvatar from "./user-avatar";
import UserNavLoading from "./user-nav-loading";
import UserNavLogout from "./user-nav-logout";

export async function UserNav() {
  const session = await getSession();
  const t = await getTranslations("DashboardLayout.UserNav");
  const locale = await getLocale();

  if (!session.isLoggedIn) {
    return <UserNavLoading />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar userId={session.id} size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="truncate font-medium text-sm leading-none">
              {session.username}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/${locale}/app/settings/appearance`}>
              {t("appearance")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/${locale}/app/settings/user`}>{t("profile")}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <UserNavLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
