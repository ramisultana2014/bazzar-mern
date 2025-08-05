import { useQuery } from "@tanstack/react-query";
import { getHubProductsApi } from "../../services/apiUser";
import type { ServerResponseForHubProducts } from "../../src/utils/types";
import { useSearchParams } from "react-router-dom";
export function useGetHubProducts() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");
  const { isPending, data, error } = useQuery<
    ServerResponseForHubProducts,
    Error
  >({
    queryKey: ["hubProducts", { page, search, sort }],
    queryFn: () => getHubProductsApi({ page, search, sort }),
  });

  return { data, isPending, error };
}
