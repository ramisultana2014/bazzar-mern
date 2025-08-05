import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { codeToResetPasswordApi } from "../../services/apiAuth";
import { type emailForResetPasswordType } from "../../src/utils/types";
export function useCodeForResetPassword() {
  const { mutate: codeForResetPassword, isPending } = useMutation({
    mutationFn: (obj: emailForResetPasswordType) => codeToResetPasswordApi(obj),
    onSuccess: () => {
      //console.log(data);
      toast.success(`email verified successfully`);
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { codeForResetPassword, isPending };
}
