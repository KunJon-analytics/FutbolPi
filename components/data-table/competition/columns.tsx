"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { getUnixTime } from "date-fns";
import Link from "next/link";

import { Competition } from "@prisma/client";
import { StatusDotWithTooltip } from "@/components/competition/status-dot-with-tooltip";

import { DataTableColumnHeader } from "./data-table-column-header";
import FormattedDate from "../formatted-date";

// import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Competition>[] = [
  {
    accessorKey: "name",
    accessorFn: (row) => row.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
    cell: ({ row }) => {
      const { name, id, isActive, type } = row.original;
      return (
        <div className="flex gap-2">
          <Link
            href={`./competitions/${id}/fixtures`}
            className="group flex max-w-[150px] items-center gap-2 md:max-w-[250px]"
          >
            <StatusDotWithTooltip isActive={isActive} type={type} />
            <span className="truncate group-hover:underline">{name}</span>
          </Link>
        </div>
      );
    },
  },
  {
    // REMINDER: visibility is handled within the `<DataTable />`
    accessorKey: "season",
    accessorFn: (row) => row.season,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="season" />
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="created" />
    ),
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const timestamp = getUnixTime(createdAt);

      return <FormattedDate timestamp={timestamp} />;
    },
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="text-right">
  //         <DataTableRowActions row={row} />
  //       </div>
  //     );
  //   },
  // },
];
