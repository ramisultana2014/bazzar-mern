import { useMutation } from "@tanstack/react-query";
import { forgetPassword as forgetPasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { type FormForgetPasswordTypes } from "../../src/utils/types";
export function useForgetPassword() {
  const navigate = useNavigate();

  const { mutate: forgetPassword, isPending } = useMutation({
    mutationFn: (obj: FormForgetPasswordTypes) => forgetPasswordApi(obj),
    onSuccess: () => {
      //console.log(data);
      toast.success(`password updated successfully`);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { forgetPassword, isPending };
}
