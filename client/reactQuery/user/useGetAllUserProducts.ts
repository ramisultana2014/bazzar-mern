import { useQuery } from "@tanstack/react-query";
import { getUserProductsApi } from "../../services/apiUser";
import { type ServerResponseForUserProduct } from "../../src/utils/types";
export function useGetAllUserProducts() {
  const { isPending, data, error } = useQuery<
    ServerResponseForUserProduct,
    Error
  >({
    queryKey: ["allUserProducts"],
    queryFn: () => getUserProductsApi(),
  });
  const products = data?.data.products ?? [];
  return { products, isPending, error };
}
