import { useQuery } from "@tanstack/react-query";
import { protectedRoutes } from "../../api/apiAuth";
// i did not use it in this app
export function useProtectRoute() {
  const { isPending, data, error } = useQuery({
    queryKey: ["protectedRoutes"],
    queryFn: () => protectedRoutes(),
  });
  //console.log("data", data);
  //data is data.msg
  return { data, isPending, error };
}
