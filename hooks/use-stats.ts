import { useQuery } from "@tanstack/react-query";

import { defaultStats, statsSchema } from "@/lib/site/stats";

function useStats() {
  const { status, data } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch(`/api/site/stats`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      const data = statsSchema.safeParse(json);
      if (!data.success) return defaultStats;
      return data.data;
    },
  });

  return { status, data };
}

export default useStats;
