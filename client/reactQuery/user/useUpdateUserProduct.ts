import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateUserProductApi } from "../../services/apiUser";
import type { DataForUpdateUserProduct } from "../../src/utils/types";

export function useUpdateUserProduct() {
  const queryClient = useQueryClient();
  const { mutate: updateUserProduct, isPending } = useMutation({
    mutationFn: (obj: DataForUpdateUserProduct) => updateUserProductApi(obj),
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
  return { updateUserProduct, isPending };
}
