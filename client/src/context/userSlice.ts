import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
//import toast from "react-hot-toast";

//initialState type is always object we put inside it properties like book, user, cart ... and the matches type
// for this slice we just put user,email ,isDarkTheme, user is object contain name,email,lastName...,  email and theme
export type User = {
  _id: string;
  name: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  email: string;
  role: string;
  isVerified: boolean;
  storeName: string;
  storeProfilePicture?: string;
  storeProfilePictureID?: string;
  storeCoverPicture?: string;
  storeCoverPictureID?: string;
};
type InitialState = {
  user: User;
  email: string;
  isDarkTheme: boolean;
};
const defaultState: InitialState = {
  user: {
    _id: "",
    name: "",
    lastName: "",
    country: "",
    phoneNumber: "",
    email: "",
    role: "",
    isVerified: false,
    storeName: "",
    storeProfilePicture: "",
    storeProfilePictureID: "",
    storeCoverPicture: "",
    storeCoverPictureID: "",
  },
  email: "",
  isDarkTheme: false,
};
const userSlice = createSlice({
  name: "userState",
  initialState: defaultState,
  reducers: {
    loggedInUserInfo: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetUserInfo: (state) => {
      state.user = {
        _id: "",
        name: "",
        lastName: "",
        country: "",
        phoneNumber: "",
        email: "",
        role: "",
        isVerified: false,
        storeName: "",
        storeProfilePicture: "",
        storeProfilePictureID: "",
        storeCoverPicture: "",
        storeCoverPictureID: "",
      };
    },
    emailForResetPassword: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    storeDarkThemeInRedux: (state, action: PayloadAction<boolean>) => {
      state.isDarkTheme = action.payload;
    },
  },
});

export const {
  loggedInUserInfo,
  resetUserInfo,
  emailForResetPassword,
  storeDarkThemeInRedux,
} = userSlice.actions;
export default userSlice.reducer;
// import { useAppDispatch, useAppSelector } from "../hooks";
//const dispatch = useAppDispatch();
//dispatch(loggedInUser(data of user)) like in  in useLogin

// then read it in any component ProtectedRoutes,ForgetPasswordForm,UploadProduct
//  const user = useAppSelector((store) => store.userState.user);
//this file is 1 , 2 is store 3 is hooks.ts 4 main.tsx
