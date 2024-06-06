import { Shell } from "@/components/dashboard/shell";
import { numberFormatter } from "@/lib/utils";

export async function Stats() {
  return (
    <Shell>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-16">
        <div className="text-center">
          <h3 className="font-cal text-3xl">{numberFormatter(62000000)}</h3>
          <p className="font-light text-muted-foreground">Total Predictions</p>
        </div>
        <div className="text-center">
          <h3 className="font-cal text-3xl">{numberFormatter(0)}</h3>
          <p className="font-light text-muted-foreground">Matches Today</p>
        </div>
        <div className="text-center">
          <h3 className="font-cal text-3xl">{numberFormatter(2400)}</h3>
          <p className="font-light text-muted-foreground">Active users</p>
        </div>
      </div>
    </Shell>
  );
}
