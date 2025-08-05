import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteUserProductApi } from "../../services/apiUser";

export function useDeleteUserProduct() {
  const queryClient = useQueryClient();
  const { mutate: deleteUserProduct, isPending } = useMutation({
    mutationFn: deleteUserProductApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allUserProducts"] }); // Invalidate specific query

      toast.success(`${data.msg}`);
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { deleteUserProduct, isPending };
}
