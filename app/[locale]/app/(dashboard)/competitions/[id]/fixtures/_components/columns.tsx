"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { FixturesResult } from "@/types";
import FormattedDate from "@/components/data-table/formatted-date";

export const columns: ColumnDef<FixturesResult>[] = [
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="kickoff" />
    ),
    cell: ({ row }) => {
      const timestamp = row.original.timestamp;

      return <FormattedDate timestamp={timestamp} />;
    },
  },
  {
    id: "homeTeam",
    accessorFn: (row) => row.homeTeam.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="homeTeam" />
    ),
    cell: ({ row }) => {
      const { homeTeam, homeGoals } = row.original;
      const score = homeGoals === null ? "-" : homeGoals.toString();
      return (
        <TeamCell logo={homeTeam.logo} name={homeTeam.name} score={score} />
      );
    },
  },
  {
    id: "awayTeam",
    accessorFn: (row) => row.awayTeam.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="awayTeam" />
    ),
    cell: ({ row }) => {
      const { awayTeam, awayGoals } = row.original;
      const score = awayGoals === null ? "-" : awayGoals.toString();
      return (
        <TeamCell logo={awayTeam.logo} name={awayTeam.name} score={score} />
      );
    },
  },
  {
    accessorKey: "round",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="round" />
    ),
    cell: ({ row }) => {
      const round = row.original.round;

      return (
        <div className="flex max-w-[84px] text-muted-foreground sm:max-w-none">
          <span className="truncate">{round}</span>
        </div>
      );
    },
  },
];

const TeamCell = ({
  logo,
  name,
  score,
}: {
  logo: string;
  name: string;
  score: string;
}) => {
  return (
    <div className="flex items-center whitespace-nowrap">
      <Image
        className="w-8 h-8 rounded-full"
        src={logo}
        alt={name}
        width={8}
        height={8}
      />
      <div className="ps-3">
        <div className="text-base font-semibold">{score}</div>

        <div className="flex font-normal max-w-[84px] sm:max-w-none text-muted-foreground text-sm">
          <span className="truncate">{name}</span>
        </div>
      </div>
    </div>
  );
};
