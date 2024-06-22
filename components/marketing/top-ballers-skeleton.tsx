import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface DataTableSkeletonProps {
  /**
   * Number of rows to render
   * @default 3
   */
  rows?: number;
}

export function TopBallersSkeleton({ rows = 3 }: DataTableSkeletonProps) {
  return (
    <Table className="mx-auto w-full max-w-xs">
      <TableCaption>
        <Skeleton className="my-1.5 h-8 w-full" />
      </TableCaption>
      <TableHeader className="bg-muted/50">
        <TableRow className="hover:bg-transparent">
          <TableHead>
            <Skeleton className="my-1.5 h-4 w-12" />
          </TableHead>
          <TableHead>
            <Skeleton className="my-1.5 h-4 w-12" />
          </TableHead>
          <TableHead>
            <Skeleton className="my-1.5 h-4 w-12" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {new Array(rows).fill(0).map((_, i) => (
          // biome-ignore lint: only one row
          <TableRow key={i} className="hover:bg-transparent">
            <TableCell>
              <Skeleton className="my-1.5 h-4 w-full max-w-[10rem]" />
            </TableCell>
            <TableCell>
              <Skeleton className="my-1.5 h-4 w-full max-w-[10rem]" />
            </TableCell>
            <TableCell>
              <Skeleton className="my-1.5 h-4 w-full max-w-[10rem]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
