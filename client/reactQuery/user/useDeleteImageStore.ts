import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../src/hooks";
import toast from "react-hot-toast";
import { deleteStoreImageApi } from "../../services/apiUser";
import { loggedInUserInfo } from "../../src/context/userSlice";
export function useDeleteStoreImages() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { mutate: deleteImage, isPending } = useMutation({
    mutationFn: (obj: {
      imageID: string;
      storeCoverPicture?: string;
      storeProfilePicture?: string;
    }) => deleteStoreImageApi(obj),
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
  return { deleteImage, isPending };
}
