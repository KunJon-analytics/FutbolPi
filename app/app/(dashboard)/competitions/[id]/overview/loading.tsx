import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid gap-4">
      <Skeleton className="h-10 w-[150px]" />
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5 sm:grid-cols-4 md:gap-6">
          {new Array(4).fill(0).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
