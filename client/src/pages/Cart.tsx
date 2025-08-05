import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import Wrapper from "../wrapper/Cart";
import {
  createOrderInRedux,
  decreaseProductQuantityInOrder,
  increaseProductQuantityInOrder,
  type Order,
} from "../context/orderSlice";
import { useCreateOrder } from "../../reactQuery/user/useCreateOrder";
function Cart() {
  const { createOrder, isPending } = useCreateOrder();
  const cart = useAppSelector((store) => store.orderState.order.cart);
  const totalItemInCart = useAppSelector(
    (store) => store.orderState.order.totalItemInCart
  );
  const totalOrderPrice = useAppSelector(
    (store) => store.orderState.order.totalOrderPrice
  );
  const userId = useAppSelector((store) => store.userState.user._id);
  const country = useAppSelector((store) => store.userState.user.country);
  const phoneNumber = useAppSelector(
    (store) => store.userState.user.phoneNumber
  );
  const email = useAppSelector((store) => store.userState.user.email);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function handleCreateOrder() {
    const orderObj: Order = {
      userId,
      email,
      totalItemInCart,
      country,
      totalOrderPrice,
      phoneNumber,
      paymentStatus: "pending",
      cart,
    };
    dispatch(createOrderInRedux(orderObj));
    createOrder(orderObj);
  }
  useEffect(
    function () {
      if (cart?.length === 0) navigate("/homepage", { replace: true }); // avoid pushing redirect to history
    },
    [cart.length, navigate]
  );
  if (cart?.length === 0) return null; // render nothing during redirect

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th> image</th>
            <th> price $</th>
            <th> quantity</th>
            <th> total price $</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.productId}>
              <td>
                <img src={item.image} alt={item.title} />
              </td>
              <td>{item.price}</td>
              <td>
                <button
                  onClick={() =>
                    dispatch(decreaseProductQuantityInOrder(item.productId))
                  }
                >
                  -
                </button>

                {item.productQuantityInCart}
                <button
                  onClick={() =>
                    dispatch(increaseProductQuantityInOrder(item.productId))
                  }
                >
                  +
                </button>
              </td>
              <td>{item.productTotalPriceInCart}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Order Price</td>
            {/* <td className="no-border"></td>
              <td className="no-border"></td> */}

            <td colSpan={3} className="no-border-left">
              {totalOrderPrice} $
            </td>
          </tr>
        </tfoot>
      </table>
      <button
        disabled={isPending}
        className="payment"
        onClick={handleCreateOrder}
      >
        continue to payment
      </button>
    </Wrapper>
  );
}
export default Cart;
