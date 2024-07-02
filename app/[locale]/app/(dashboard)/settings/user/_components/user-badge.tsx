import { useFormatter } from "next-intl";
import { Award, CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { UserStatResponse } from "@/app/api/profile/[accessToken]/get-stat";

type Props = { badge: UserStatResponse["badges"][number] };

export function UserBadge({ badge }: Props) {
  const format = useFormatter();
  const distance = format.relativeTime(badge.badge.createdAt);

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Badge
          className={cn(
            `bg-${badge.badge.color}-900 text-${badge.badge.color}-200 hover:bg-${badge.badge.color}-900/80 p-2`
          )}
          variant="outline"
          key={`${badge.badge.name}-${badge.id}`}
        >
          <Award className="h-4 w-4" /> {`${badge.badge.name} #${badge.id}`}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="/assets/logos/logo.png" />
            <AvatarFallback>FP</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{`${badge.badge.name} #${badge.id}`}</h4>
            <p className="text-sm">{badge.badge.description}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">{distance}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
