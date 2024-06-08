"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Prisma } from "@prisma/client";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<
  Prisma.PickEnumerable<Prisma.PredictionGroupByOutputType, "username"[]> & {
    _sum: {
      points: number | null;
    };
  }
>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },

  {
    accessorKey: "_sum.points",
    id: "points",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Points" />
    ),
  },
];
