import { HiPencil, HiTrash } from "react-icons/hi2";
import { formateDate } from "../utils/date";
import type { UserProduct } from "../utils/types";
import DeleteUserProduct from "./DeleteUserProduct";
import Menus from "./Menus";
import Modal from "./Modal";
import UpdateUserProduct from "./UpdateUserProduct";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addProductToCart } from "../context/orderSlice";
import toast from "react-hot-toast";

function ProductCard({
  product,
  show,
  showAdd,
}: {
  product: UserProduct;
  show?: boolean;
  showAdd?: boolean;
}) {
  //i use ProductCard in tow different places with tow css files
  // css in ProfilePage.ts and for HomePage css in HomePage.ts
  const user = useAppSelector((store) => store.userState.user);
  const { createdAt, title, price, quantity, productImage, productOwnerID } =
    product;
  const dispatch = useAppDispatch();
  const cart = useAppSelector((store) => store.orderState.order.cart);
  const isProductInCart = cart.find((item) => item.productId === product._id);
  function handleAddProductToCart() {
    if (isProductInCart) {
      toast("product already in the cart");
      return;
    }
    dispatch(
      addProductToCart({
        userBuyerId: user._id,
        productId: product._id,
        title,
        productQuantityInCart: 1,
        price,
        productTotalPriceInCart: price * 1,
        image: productImage,
        productOwnerId: productOwnerID,
        productQuantityInDataBase: quantity,
      })
    );
    toast("product added successfully");
  }
  return (
    <div className={`productCard ${quantity > 1 ? "" : "out-of-sale"}`}>
      <div className="image-container">
        <img src={productImage} />
      </div>
      <div className="productCard-info">
        <div>
          <h3>{title}</h3>
          <p>price &rsaquo; {price} $</p>
          {show && <p>quantity &rsaquo; {quantity}</p>}
          {show && <time>created At : {formateDate(createdAt)}</time>}
        </div>
        {showAdd && (
          <div>
            {quantity > 1 ? (
              <button className="add" onClick={handleAddProductToCart}>
                ADD To Cart
              </button>
            ) : (
              <p>out of sale</p>
            )}
          </div>
        )}
      </div>
      {user._id === productOwnerID && (
        <div className="minus-div">
          {/* Menus must wrap the parent div */}
          <Modal>
            {/* //Menu is just div */}
            <Menus.Menu>
              {/* Menus.Toggle is just the dotted button  to open the Menus.List */}
              <Menus.Toggle id={product._id} />

              <Menus.List id={product._id}>
                <Modal.Open nameToOpenWindow="update">
                  {/* children of Modal.Open must be button du to clone to add the onclick so we can match name in Modal.Window */}

                  <button>
                    <HiPencil /> update product
                  </button>
                </Modal.Open>
                <Modal.Open nameToOpenWindow="delete">
                  {/* children of Modal.Open must be button du to clone to add the onclick so we can match name in Modal.Window */}

                  <button>
                    <HiTrash /> delete
                  </button>
                </Modal.Open>
              </Menus.List>
              <Modal.Window name="delete">
                {/* inside Modal.Window we put the component that will handle logic like update - delete, update */}
                {/* closeWindow is now pass to DeleteUserProduct du to clone so to use we write it as props in ConfirmDelete */}
                <DeleteUserProduct product={product} />
              </Modal.Window>
              <Modal.Window name="update">
                {/* inside Modal.Window we put the component that will handle logic like update - delete, update */}
                {/* closeWindow is now pass to DeleteUserProduct du to clone so to use we write it as props in ConfirmDelete */}
                <UpdateUserProduct product={product} />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      )}
    </div>
  );
}
export default ProductCard;
