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
            <Link href={`/app/settings/appearance`}>Appearance</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/app/settings/user`}>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <UserNavLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
