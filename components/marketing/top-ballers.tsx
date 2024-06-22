import { getTranslations } from "next-intl/server";
import { unstable_cache } from "next/cache";
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
import prisma from "@/lib/prisma";

import {
  CardContainer,
  CardDescription,
  CardHeader,
  CardIcon,
  CardTitle,
} from "./card";
import { TopBallersSkeleton } from "./top-ballers-skeleton";

const getTopBallers = unstable_cache(
  async () =>
    prisma.prediction.groupBy({
      by: ["username"],
      _sum: { points: true },
      _count: { username: true },
      orderBy: { _sum: { points: "desc" } },
      take: 5,
    }),
  ["top-ballers"],
  { revalidate: 3600 }
);

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
  const data = await getTopBallers();
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
            <TableCell>{player._count.username}</TableCell>
            <TableCell className="text-right">{player._sum.points}</TableCell>
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
