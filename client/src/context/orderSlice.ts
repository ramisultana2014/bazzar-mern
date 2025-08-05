import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
//initialState type is always object we put inside it properties like book, user, cart ... and the matches type
// for this slice we just put order which is object

type ProductInTheCart = {
  userBuyerId: string;
  productId: string;
  title: string;
  productQuantityInCart: number;
  price: number;
  productTotalPriceInCart: number;
  image?: string;
  productOwnerId: string | { _id: string; email: string; phoneNumber: string };
  productQuantityInDataBase: number;
};
type Cart = ProductInTheCart[];

export type Order = {
  userId: string | null;
  email: string | null;
  totalItemInCart: number;
  totalOrderPrice: number;
  country: string | null;
  phoneNumber: string | null;
  paymentStatus: "pending" | "paid" | "failed";
  cart: Cart;
};
type InitialState = {
  order: Order;
};
const defaultState: InitialState = {
  order: {
    userId: null,
    email: null,
    totalItemInCart: 0,
    totalOrderPrice: 0,
    phoneNumber: null,
    country: null,
    paymentStatus: "pending",
    cart: [],
  },
};
const orderSlice = createSlice({
  name: "orderState",
  initialState: defaultState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ProductInTheCart>) => {
      const isExist = state.order.cart.find(
        (product) => product.productId === action.payload.productId
      );
      if (isExist) {
        toast("product already in the cart");
        return;
      }
      state.order.cart.push(action.payload);
      // state.order.totalItemInCart = state.order.cart.reduce(
      //   (acc, cur) => acc + cur.productQuantityInCart,
      //   0
      // );
      state.order.totalItemInCart += action.payload.productQuantityInCart;
      state.order.totalOrderPrice += action.payload.productTotalPriceInCart;
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      const isExist = state.order.cart.find(
        (product) => product.productId === action.payload
      );
      if (!isExist) {
        toast("no product in the cart");
        return;
      }
      state.order.cart = state.order.cart.filter(
        (product) => product.productId !== action.payload
      );
      const { totalQty, totalPrice } = state.order.cart.reduce(
        (acc, cur) => {
          acc.totalQty += cur.productQuantityInCart;
          acc.totalPrice += cur.productTotalPriceInCart;
          return acc;
        },
        { totalQty: 0, totalPrice: 0 }
      );

      state.order.totalItemInCart = totalQty;
      state.order.totalOrderPrice = totalPrice;
    },
    decreaseProductQuantityInOrder: (state, action: PayloadAction<string>) => {
      const productInOrder = state.order.cart.find(
        (product) => product.productId === action.payload
      );
      if (!productInOrder) {
        toast("no product in the cart");
        return;
      }
      if (productInOrder.productQuantityInCart === 1) {
        orderSlice.caseReducers.removeProductFromCart(state, action);
        toast("product removed ");
      } else {
        state.order.cart = state.order.cart.map((product) =>
          product.productId === action.payload
            ? {
                ...product,
                productQuantityInCart: product.productQuantityInCart - 1,
                productTotalPriceInCart:
                  product.price * (product.productQuantityInCart - 1),
              }
            : product
        );
        const { totalQty, totalPrice } = state.order.cart.reduce(
          (acc, cur) => {
            acc.totalQty += cur.productQuantityInCart;
            acc.totalPrice += cur.productTotalPriceInCart;
            return acc;
          },
          { totalQty: 0, totalPrice: 0 }
        );

        state.order.totalItemInCart = totalQty;
        state.order.totalOrderPrice = totalPrice;
      }
    },
    increaseProductQuantityInOrder: (state, action: PayloadAction<string>) => {
      const productInOrder = state.order.cart.find(
        (product) => product.productId === action.payload
      );
      if (!productInOrder) {
        toast("no product in the cart");
        return;
      }
      if (
        productInOrder.productQuantityInDataBase <=
        productInOrder.productQuantityInCart
      ) {
        toast(
          `maximum quantity is ${productInOrder.productQuantityInDataBase} `
        );
        return;
      }
      state.order.cart = state.order.cart.map((product) =>
        product.productId === action.payload
          ? {
              ...product,
              productQuantityInCart: product.productQuantityInCart + 1,
              productTotalPriceInCart:
                product.price * (product.productQuantityInCart + 1),
            }
          : product
      );
      const { totalQty, totalPrice } = state.order.cart.reduce(
        (acc, cur) => {
          acc.totalQty += cur.productQuantityInCart;
          acc.totalPrice += cur.productTotalPriceInCart;
          return acc;
        },
        { totalQty: 0, totalPrice: 0 }
      );

      state.order.totalItemInCart = totalQty;
      state.order.totalOrderPrice = totalPrice;
    },
    createOrderInRedux: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    clearOrderInRedux: (state) => {
      state.order = {
        userId: null,
        email: null,
        totalItemInCart: 0,
        totalOrderPrice: 0,
        phoneNumber: null,
        country: null,
        paymentStatus: "pending",
        cart: [],
      };
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  decreaseProductQuantityInOrder,
  increaseProductQuantityInOrder,
  createOrderInRedux,
  clearOrderInRedux,
} = orderSlice.actions;
export default orderSlice.reducer;

// import { useAppDispatch, useAppSelector } from "../hooks";
//const dispatch = useAppDispatch();
//dispatch(addProductToCart(data of product)) like in  in ProductCard

// then read it in any component cart also in header
//  const cart = useAppSelector((store) => store.orderState.cart);
//this file is 1 , 2 is store 3 is hooks.ts 4 main.tsx
