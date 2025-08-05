import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { type FormLoginTypes } from "../../src/utils/types";
import { useAppDispatch } from "../../src/hooks";
import { loggedInUserInfo } from "../../src/context/userSlice";
export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logIn, isPending } = useMutation({
    mutationFn: (loginObj: FormLoginTypes) => loginApi(loginObj),
    onSuccess: (data) => {
      //console.log(data.data.user);
      toast.success(`${data.msg}`);
      queryClient.setQueryData(["user"], data.data.user);
      dispatch(loggedInUserInfo(data.data.user));
      navigate("/homepage", { replace: true });
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { logIn, isPending };
}
