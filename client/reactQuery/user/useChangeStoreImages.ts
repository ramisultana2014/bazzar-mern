import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../src/hooks";
import toast from "react-hot-toast";
import { ChangeStoreImageApi } from "../../services/apiUser";
import { loggedInUserInfo } from "../../src/context/userSlice";
export function useChangeStoreImages() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { mutate: changeImage, isPending } = useMutation({
    mutationFn: (formData: FormData) => ChangeStoreImageApi(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["profilePicture"],
        data.data.user.storeProfilePicture
      );

      dispatch(loggedInUserInfo(data.data.user));
      toast.success(`${data.msg}`);
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { changeImage, isPending };
}
