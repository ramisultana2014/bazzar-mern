import type { UserProduct } from "../utils/types";
import Wrapper from "../wrapper/DeleteImage";
import { useDeleteUserProduct } from "../../reactQuery/user/useDeleteUserProduct";
function DeleteUserProduct({
  closewindow,
  product,
}: {
  closewindow?: () => void;
  product: UserProduct;
}) {
  const { deleteUserProduct, isPending } = useDeleteUserProduct();
  //css in ProfilePage.ts
  return (
    <Wrapper>
      <h4>Delete</h4>
      <p>
        Are you sure you want to delete <span>{product.title} product </span>
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
          onClick={() => {
            deleteUserProduct(product._id);
            if (closewindow) closewindow();
          }}
          className="btn submit"
        >
          Delete
        </button>
      </div>
    </Wrapper>
  );
}
export default DeleteUserProduct;
