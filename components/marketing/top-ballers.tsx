import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@/intl/navigation";
import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";
import { type TopBallers, defaultTopBallers } from "@/lib/site/stats";

import {
  CardContainer,
  CardDescription,
  CardHeader,
  CardIcon,
  CardTitle,
} from "./card";
import { TopBallersSkeleton } from "./top-ballers-skeleton";

async function getData() {
  const res = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/site/stats/top-ballers`,
    { next: { revalidate: 3600 } }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return defaultTopBallers;
  }

  return (await res.json()) as TopBallers;
}

export async function TopBallers() {
  const t = await getTranslations("Index.TopBallers");

  return (
    <CardContainer>
      <CardHeader>
        <CardIcon icon="users" />
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <Suspense fallback={<TopBallersSkeleton />}>
        <TopballersTable />
      </Suspense>

      <div className="flex justify-center">
        <Button className="rounded-full" asChild>
          <Link href="/app/competitions">{t("ctaButton")}</Link>
        </Button>
      </div>
    </CardContainer>
  );
}

const TopballersTable = async () => {
  const data = await getData();
  const t = await getTranslations("Index.TopBallers.Table");

  return (
    <Table className="mx-auto w-full max-w-xs">
      <TableCaption>{t("caption")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">{t("username")}</TableHead>
          <TableHead className="w-[50px]">{t("points")}</TableHead>
          <TableHead className="text-right">{t("predictions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((player) => (
          <TableRow key={player.username}>
            <TableCell className="font-medium">{player.username}</TableCell>
            <TableCell>{player._sum.points}</TableCell>
            <TableCell className="text-right">
              {player._count.username}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* // use to show logged in user points later */}
      {/* <TableFooter>
          <TableRow>
            <TableCell >Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
    </Table>
  );
};
