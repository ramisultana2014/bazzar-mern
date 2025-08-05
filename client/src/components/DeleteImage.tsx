import Wrapper from "../wrapper/DeleteImage";
import { useDeleteStoreImages } from "../../reactQuery/user/useDeleteImageStore";
function DeleteImage({
  closewindow,
  imageType,
  imageID,
}: {
  closewindow?: () => void;
  imageType: "storeCoverPicture" | "storeProfilePicture";
  imageID?: string;
}) {
  const { deleteImage, isPending } = useDeleteStoreImages();

  function handleDeleteImage() {
    if (!imageID) return;
    const obj = { imageID };
    deleteImage(
      { ...obj, [imageType]: imageType },
      {
        onSuccess: () => {
          if (closewindow) closewindow();
        },
      }
    );
  }
  return (
    <Wrapper>
      {imageID ? (
        <>
          <h4>Delete</h4>

          <p>
            Are you sure you want to delete <span>{imageType} image </span>
            permanently? This action cannot be undone.
          </p>
          <div className="btns">
            <button
              className="btn cancel"
              onClick={() => closewindow && closewindow()}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              disabled={isPending}
              onClick={handleDeleteImage}
              className="btn submit"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <p>this image can't be deleted</p>
      )}
    </Wrapper>
  );
}
export default DeleteImage;
