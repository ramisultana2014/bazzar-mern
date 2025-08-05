import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./context/userSlice";
import orderReducer from "./context/orderSlice";
export const store = configureStore({
  reducer: {
    userState: userReducer,
    orderState: orderReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// import { useAppDispatch, useAppSelector } from "../hooks";
//const dispatch = useAppDispatch();
//dispatch(loggedInUser(data of user)) like in  in useLogin

// then read it in any component or function like useAuth
//  const user = useAppSelector((store) => store.userState.user);
//1 context folder , this file is 2, 3 is hooks.ts 4 main.tsx
