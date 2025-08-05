import { useState } from "react";
import Wrapper from "../wrapper/UploadImage";
import { useForm } from "react-hook-form";
import type { UploadImageType } from "../utils/types";
import { useChangeStoreImages } from "../../reactQuery/user/useChangeStoreImages";
function UploadImage({
  closewindow,
  imageType,
}: {
  closewindow?: () => void;
  imageType: string;
}) {
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { register, formState, handleSubmit, reset } =
    useForm<UploadImageType>();
  const { errors } = formState;
  const { changeImage, isPending } = useChangeStoreImages();
  async function onSubmit(data: UploadImageType) {
    try {
      const imageFile = data.picture[0];
      const formData = new FormData();
      formData.append("image", imageFile);
      if (imageType === "storeProfilePicture")
        formData.append("storeProfilePicture", "storeProfilePicture");
      if (imageType === "storeCoverPicture")
        formData.append("storeCoverPicture", "storeCoverPicture");

      changeImage(formData, {
        onSuccess: () => {
          reset();
          setFileName("");
          setPreviewUrl("");
          if (closewindow) closewindow();
        },
      });
    } catch (err) {
      console.error("Error uploading post:", err);
    }
  }
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      // URL.createObjectURL(file) creates a temporary URL to preview the image.
      // setPreviewUrl("") clears the preview on reset/cancel.

      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFileName("");
      setPreviewUrl("");
    }
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          aria-disabled={isPending}
          htmlFor="file-upload"
          className="custom-file-upload"
          // onChange={(e) =>
          //   setFileName(e.target.files[0]?.name || "No file selected")
          // }
        >
          {fileName || "choose your file"}
        </label>
        <input
          className="file"
          type="file"
          id="file-upload"
          accept="image/*"
          {...register("picture", {
            required: true,
            validate: {
              size: (fileList) => {
                const file = fileList?.[0];
                if (!file) return "No file selected";
                return (
                  file.size <= 1_500_000 ||
                  "File size should be less than 1.5MB"
                );
              },
            },
          })}
          onChange={handleFileChange}
          disabled={isPending}
        />
        {errors?.picture?.message && <span>{errors.picture.message}</span>}
        {previewUrl && (
          <div role="region" aria-label="Image preview">
            <img src={previewUrl} alt="Selected preview" />
          </div>
        )}
        <div className="btns">
          <button
            // disabled={isPending}
            className="submit"
            type="submit"
          >
            {isPending ? "...." : "save"}
          </button>
          <button
            onClick={() => closewindow && closewindow()}
            // onClick={() => navigate("/homepage")}

            className="btn cancel"
            type="reset"
            disabled={isPending}
          >
            Cancel
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
export default UploadImage;
