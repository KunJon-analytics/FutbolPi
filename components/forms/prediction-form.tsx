"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { toastAction } from "@/lib/toast";
import {
  PredictionInsertSchema,
  predictionInsertSchema,
} from "@/lib/prediction/schema";
import { canPredict } from "@/lib/utils";
import { predict } from "@/actions/prediction";

import { LoadingAnimation } from "../loading-animation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

export function PredictionForm({
  defaultValues,
  fixture,
}: {
  defaultValues: PredictionInsertSchema;
  fixture: { homeTeam: string; awayTeam: string; timestamp: number };
}) {
  const form = useForm<PredictionInsertSchema>({
    resolver: zodResolver(predictionInsertSchema),
    defaultValues,
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const isAllowed = canPredict(fixture.timestamp);

  async function onSubmit(data: PredictionInsertSchema) {
    startTransition(async () => {
      try {
        if (!canPredict(fixture.timestamp)) {
          toastAction("error");
          router.refresh();
        }
        const result = await predict(data);
        if (result.success) {
          toastAction("saved");
          queryClient.invalidateQueries({
            queryKey: ["fixtures", defaultValues.fixtureId, "predictions"],
          });
          router.refresh();
        } else {
          toastAction("error");
        }
      } catch {
        toastAction("error");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Home Team</TableHead>
              <TableHead>Away Team</TableHead>
              <TableHead className="w-[100px]">Can Predict?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <FormField
                  control={form.control}
                  name="homeGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        {fixture.homeTeam}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step={1}
                          {...field}
                          disabled={!isAllowed}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  control={form.control}
                  name="awayGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        {fixture.homeTeam}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step={1}
                          {...field}
                          disabled={!isAllowed}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                {isAllowed ? (
                  <span className="">Allowed</span>
                ) : (
                  <span className="text-destructive">Not Allowed</span>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="sm:col-span-full">
          <Button className="w-full sm:w-auto" size="lg" disabled={!isAllowed}>
            {!isPending ? "Confirm" : <LoadingAnimation />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
