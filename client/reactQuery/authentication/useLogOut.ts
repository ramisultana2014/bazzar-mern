import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../src/hooks";
import { resetUserInfo } from "../../src/context/userSlice";
export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: (data) => {
      //console.log(data);
      toast.success(`${data.msg}`);
      queryClient.clear();
      dispatch(resetUserInfo());
      navigate("/", { replace: true });
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { logout };
}
