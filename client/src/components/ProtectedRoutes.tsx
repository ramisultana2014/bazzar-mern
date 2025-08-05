import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../hooks";
import { PageNotFound } from "../pages";
import { useEffect, type PropsWithChildren } from "react";
import { loggedInUserInfo, type User } from "../context/userSlice";

function ProtectedRoutes({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  // when user log  or verivid   we save user info in userSlice by useLogin or useVerifiedEmailAddress
  //  in userInRedux: we read user info from the userSlice
  const userInRedux = useAppSelector((state) => state.userState.user);
  //console.log("userInRedux", userInRedux);
  // if user refresh the page, then userInRedux reseted(mean it gone)and with the userFromCache  we try to read data from storage[in  steps 2 ,3 in App.tsx we save data in React Query cache storage]
  // good practice to use dispatch inside useEffect or inside a function, never use dispatch alone it cause wierd behaviour

  const userFromCache = queryClient.getQueryData(["user"]) as User | undefined;
  // by useEffect we check if there is no user in userSlice and a there is  user info in the storage then  save user info again in user slice
  useEffect(() => {
    // the if mean  1-!userInRedux.id thats happen if user refresh the page or he did not log in yet ,2-userFromCache mean we have data in  React Query cache storage thats done when we queryClient.setQueryData
    if (!userInRedux._id && userFromCache) {
      dispatch(loggedInUserInfo(userFromCache));
    }
  }, [dispatch, userFromCache, userInRedux._id]);

  if (!userInRedux || !userInRedux._id) {
    return <div>Loading...</div>; // Add your Spinner component here
  }
  if (!userInRedux.isVerified)
    return (
      <PageNotFound errorMessage="please log in first to start your bazzar" />
    );

  return <>{children}</>;
}

export default ProtectedRoutes;
