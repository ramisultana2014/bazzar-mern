import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { verifiedEmailAddress as verifiedEmailAddressApi } from "../../services/apiAuth";
import { useAppDispatch } from "../../src/hooks";
import { loggedInUserInfo } from "../../src/context/userSlice";
export function useAccountActivate() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: accountActivate, isPending } = useMutation({
    mutationFn: (obj: { verificationCode: string }) =>
      verifiedEmailAddressApi(obj),
    onSuccess: (data) => {
      toast.success(`${data.data.user.name} your account is  activate`);
      queryClient.setQueryData(["user"], data.data.user);
      dispatch(loggedInUserInfo(data.data.user));
      navigate("/homepage", { replace: true });
    },
    onError: (error) => {
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { accountActivate, isPending };
}
