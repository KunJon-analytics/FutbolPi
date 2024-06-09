"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import Image from "next/image";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { FixturesResult } from "@/types";

export const columns: ColumnDef<FixturesResult>[] = [
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kickoff" />
    ),
    cell: ({ row }) => {
      const timestamp = row.original.timestamp;

      const distance = formatDistanceToNowStrict(fromUnixTime(timestamp), {
        addSuffix: true,
      });
      return (
        <div className="flex max-w-[84px] text-muted-foreground sm:max-w-none">
          <span className="truncate">{distance}</span>
        </div>
      );
    },
  },
  {
    id: "homeTeam",
    accessorFn: (row) => row.homeTeam.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Home Team" />
    ),
    cell: ({ row }) => {
      const { homeTeam } = row.original;
      return <TeamCell logo={homeTeam.logo} name={homeTeam.name} />;
    },
  },
  {
    accessorKey: "homeGoals",
    header: "Home Goals",
    cell: ({ row }) => {
      const goals = row.original.homeGoals;
      if (goals) {
        return <span className="">{goals}</span>;
      }
      return <span className="text-muted-foreground">-</span>;
    },
  },
  {
    accessorKey: "awayGoals",
    header: "Away Goals",
    cell: ({ row }) => {
      const goals = row.original.awayGoals;
      if (goals) {
        return <span className="">{goals}</span>;
      }
      return <span className="text-muted-foreground">-</span>;
    },
  },
  {
    id: "awayTeam",
    accessorFn: (row) => row.awayTeam.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Away Team" />
    ),
    cell: ({ row }) => {
      const { awayTeam } = row.original;
      return <TeamCell logo={awayTeam.logo} name={awayTeam.name} />;
    },
  },
  {
    accessorKey: "round",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Round" />
    ),
  },
];

const TeamCell = ({ logo, name }: { logo: string; name: string }) => {
  return (
    <div className="flex items-center px-6 py-4 whitespace-nowrap">
      <Image
        className="w-10 h-10 rounded-full"
        src={logo}
        alt={name}
        width={10}
        height={10}
      />
      <div className="ps-3">
        <div className="text-base font-semibold">{name}</div>
      </div>
    </div>
  );
};
