"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";

import { Competition } from "@prisma/client";
import { StatusDotWithTooltip } from "@/components/competition/status-dot-with-tooltip";

// import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Competition>[] = [
  {
    accessorKey: "name",
    accessorFn: (row) => row.name,
    header: "Name",
    cell: ({ row }) => {
      const { name, id, isActive, type } = row.original;
      return (
        <div className="flex gap-2">
          <Link
            href={`./competitions/${id}/overview`}
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
    header: "Season",
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const timestamp = row.original.createdAt;

      const distance = formatDistanceToNowStrict(new Date(timestamp), {
        addSuffix: true,
      });
      return (
        <div className="flex max-w-[84px] text-muted-foreground sm:max-w-none">
          <span className="truncate">{distance}</span>
        </div>
      );
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
