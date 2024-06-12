import { useQuery } from "@tanstack/react-query";

import { defaultSession, sessionSchema } from "@/lib/utils";

function useSession() {
  const { status, data } = useQuery({
    queryKey: ["session"],
    refetchInterval: 1000 * 60 * 10,
    queryFn: async () => {
      const response = await fetch(`/api/session`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      const data = sessionSchema.safeParse(json);
      if (!data.success) return defaultSession;
      return data.data;
    },
  });

  return { status, data };
}

export default useSession;
