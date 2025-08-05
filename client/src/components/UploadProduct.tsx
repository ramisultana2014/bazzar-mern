import { useForm, type FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { UploadProductType } from "../utils/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../hooks";
import { useUploadProduct } from "../../reactQuery/user/useUploadProduct";
function UploadProduct() {
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { register, handleSubmit, reset } = useForm<UploadProductType>();
  const userInRedux = useAppSelector((state) => state.userState.user);
  const navigate = useNavigate();
  const { uploadProduct, isPending } = useUploadProduct();
  async function onSubmit(data: UploadProductType) {
    //console.log(data);
    try {
      const imageFile = data.picture[0];
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("price", data.price.toString());
      formData.append("quantity", data.quantity.toString());
      formData.append("description", data.description);
      formData.append("productOwnerID", userInRedux._id);
      formData.append("storeName", userInRedux.storeName);

      uploadProduct(formData, {
        onSuccess: () => {
          reset();
          URL.revokeObjectURL(previewUrl); // to clean up memory
          setFileName("");
          setPreviewUrl("");
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
  const onError = (errors: FieldErrors<UploadProductType>) => {
    if (errors.title) {
      toast.error(errors.title.message as string);
    }
    if (errors.picture) {
      toast.error(errors.picture.message as string);
    }
    if (errors.price) {
      toast.error(errors.price.message as string);
    }
    if (errors.description) {
      toast.error(errors.description.message as string);
    }
    if (errors.quantity) {
      toast.error(errors.quantity.message as string);
    }
    if (errors.category) {
      toast.error(errors.category.message as string);
    }
  };
  //style in AddProduct.ts
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <h3>please fill all the inputs</h3>
      <input
        type="text"
        id="title"
        disabled={isPending}
        placeholder="TITLE"
        {...register("title", {
          required: "title is required",
          maxLength: {
            value: 20,
            message: "title must be 20 characters or fewer",
          },
          pattern: {
            value: /^[A-Za-z0-9\s.,'"&\-():!?]+$/,

            message:
              "title must contain only letters, numbers, spaces, and basic punctuation",
          },
        })}
      />
      <input
        type="text"
        id="description"
        disabled={isPending}
        placeholder="DESCRIPTION"
        {...register("description", {
          required: "description is required",
          maxLength: {
            value: 50,
            message: "Description must be 50 characters or fewer",
          },
          pattern: {
            value: /^[A-Za-z0-9\s.,'"&\-():!?]+$/,
            message:
              "Description must contain only letters, numbers, spaces, and basic punctuation",
          },
        })}
      />
      <select
        disabled={isPending}
        id="category"
        {...register("category", { required: "category is required" })}
      >
        <option value="">CATEGORY</option>
        <option value="gold">gold</option>
        <option value="clothes">clothes</option>
        <option value="heel">heel</option>
        <option value="dress">dress</option>
        <option value="bags">bags</option>
        <option value="healthCare">healthCare</option>
        <option value="home & kitchen">home & kitchen</option>
        <option value="pet supplies">pet supplies</option>
        <option value="supplement ">supplement </option>
        <option value="makeup ">makeup </option>
        <option value="different ">others </option>
      </select>
      <input
        type="number"
        id="price"
        disabled={isPending}
        placeholder="PRICE"
        {...register("price", {
          required: "price is required",
          valueAsNumber: true,
          validate: (v) => {
            const isValid = v > 1;
            return isValid || "price must be positive";
          },
        })}
      />

      <input
        type="number"
        id="quantity"
        disabled={isPending}
        placeholder="QUANTITY"
        {...register("quantity", {
          required: "quantity is required",
          valueAsNumber: true,
          validate: (v) => {
            const isValid = v > 0;
            return isValid || "quantity must be positive";
          },
        })}
      />
      <label
        aria-disabled={isPending}
        htmlFor="file-upload"
        className="custom-file-upload"
      >
        {fileName || "upload your image"}
      </label>
      <input
        className="file"
        type="file"
        id="file-upload"
        accept="image/*"
        {...register("picture", {
          required: "image is required",
          validate: {
            size: (fileList) => {
              const file = fileList?.[0];
              if (!file) return "No file selected";
              return (
                file.size <= 2_000_000 || "File size should be less than 2MB"
              );
            },
          },
        })}
        onChange={handleFileChange}
        disabled={isPending}
      />

      {previewUrl && (
        <div
          role="region"
          aria-label="Image preview"
          className="image-container"
        >
          <img src={previewUrl} alt="Selected preview" />
        </div>
      )}
      <div className="btns">
        <button disabled={isPending} className="submit" type="submit">
          {isPending ? "....." : "upload"}
        </button>
        <button
          onClick={() => navigate("/homepage")}
          className="btn cancel"
          type="reset"
          disabled={isPending}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default UploadProduct;
