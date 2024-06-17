import { getSession } from "@/actions/session";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";

export default async function UserPage() {
  const session = await getSession();
  const predictions = await prisma.prediction.aggregate({
    where: { username: session.username },
    _count: { id: true },
    _sum: { points: true },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="grid max-w-sm gap-3">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={`${session.username}`} disabled />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="predictions">Predictions</Label>
          <Input
            id="predictions"
            type="number"
            value={`${predictions._count.id}`}
            disabled
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="points">Points</Label>
          <Input
            id="points"
            type="number"
            value={`${predictions._sum.points}`}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
