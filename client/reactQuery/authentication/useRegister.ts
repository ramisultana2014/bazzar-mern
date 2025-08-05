import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { FormSignupTypes } from "../../src/utils/types";
import { registerApi } from "../../services/apiAuth";
export function useCreateRegister() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (obj: FormSignupTypes) => registerApi(obj),
    onSuccess: (data) => {
      toast.success(`${data.msg}`);
      queryClient.setQueryData(["user"], data.data);
      navigate("/verifiedEmailAddress");
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { signup, isPending };
}
