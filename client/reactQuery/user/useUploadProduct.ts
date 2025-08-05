import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { uploadProductApi } from "../../services/apiUser";
import { useNavigate } from "react-router-dom";
export function useUploadProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: uploadProduct, isPending } = useMutation({
    mutationFn: (formData: FormData) => uploadProductApi(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allUserProducts"] }); // Invalidate specific query

      toast.success(`${data.msg}`);
      navigate("/profile", { replace: true });
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { uploadProduct, isPending };
}
