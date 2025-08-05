import { useQuery } from "@tanstack/react-query";
import { getStatsApi } from "../../services/apiUser";
import type { serverResponseForStats } from "../../src/utils/types";

export function useGetStats() {
  const { isPending, data, error } = useQuery<serverResponseForStats, Error>({
    queryKey: ["stats"],
    queryFn: () => getStatsApi(),
  });

  return { data, isPending, error };
}
