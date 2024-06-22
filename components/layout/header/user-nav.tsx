"use client";

import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCurrentSession from "@/components/providers/session-provider";
import { Link } from "@/intl/navigation";

import UserAvatar from "./user-avatar";
import UserNavLoading from "./user-nav-loading";
import UserNavLogout from "./user-nav-logout";
import { LoginButton } from "../login-button";

export function UserNav() {
  const t = useTranslations("DashboardLayout.UserNav");
  const { session, status, isPending } = useCurrentSession();

  if (isPending) {
    return <UserNavLoading />;
  }

  if (!session.isLoggedIn || status === "error") {
    return <LoginButton size={"icon"} variant={"outline"} />;
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
            <Link href={`/app/settings/appearance`}>{t("appearance")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/app/settings/user`}>{t("profile")}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <UserNavLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
