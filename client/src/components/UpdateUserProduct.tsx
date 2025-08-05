import { useForm, type FieldErrors } from "react-hook-form";
import type { UpdateUserProductType, UserProduct } from "../utils/types";
import toast from "react-hot-toast";
import Wrapper from "../wrapper/UpdateUserProduct";
import { useUpdateUserProduct } from "../../reactQuery/user/useUpdateUserProduct";
function UpdateUserProduct({
  closewindow,
  product,
}: {
  closewindow?: () => void;
  product: UserProduct;
}) {
  const { register, handleSubmit, reset } = useForm<UpdateUserProductType>();
  const { updateUserProduct, isPending } = useUpdateUserProduct();
  async function onSubmit(data: UpdateUserProductType) {
    const ownerId =
      typeof product.productOwnerID === "string"
        ? product.productOwnerID
        : product.productOwnerID._id;
    try {
      updateUserProduct(
        {
          updatedData: { ...data, productOwnerId: ownerId },
          productId: product._id,
        },
        {
          onSuccess: () => {
            reset();
            if (closewindow) closewindow();
          },
        }
      );
    } catch (err) {
      console.error("Error updating product:", err);
    }
  }
  const onError = (errors: FieldErrors<UpdateUserProductType>) => {
    if (errors.title) {
      toast.error(errors.title.message as string);
    }

    if (errors.price) {
      toast.error(errors.price.message as string);
    }

    if (errors.quantity) {
      toast.error(errors.quantity.message as string);
    }
  };
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit, onError)}>
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
        defaultValue={product.title}
      />

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
        defaultValue={product.price}
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
        defaultValue={product.quantity}
      />

      <div className="btns">
        <button disabled={isPending} className="submit" type="submit">
          {isPending ? "....." : "update"}
        </button>
        <button
          onClick={() => closewindow && closewindow()}
          className="btn cancel"
          type="reset"
          disabled={isPending}
        >
          Cancel
        </button>
      </div>
    </Wrapper>
  );
}
export default UpdateUserProduct;
