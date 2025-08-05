import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
// npm install @tanstack/react-query-persist-client
// npm i @tanstack/query-sync-storage-persister
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  AddProduct,
  AppLayOut,
  Cart,
  ForgetPasswordPage,
  HomePage,
  LoginPage,
  PageNotFound,
  Profile,
  SignupPage,
  VerifiedEmailAddress,
} from "./pages";
import { ProtectedRoutes } from "./components";
import { checkDefaultTheme } from "./utils/theme";
import { lazy, useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { storeDarkThemeInRedux } from "./context/userSlice";

const CheckOut = lazy(() => import("./pages/CheckOut.tsx"));
const Return = lazy(() => import("./pages/Return.tsx"));
const Chart = lazy(() => import("./pages/Chart.tsx"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, //Specifies the duration (in milliseconds) that a query's data is considered "fresh."
      gcTime: 1000 * 60 * 20, //Determines how long unused query results stay in memory before being garbage-collected.
      refetchOnWindowFocus: false, //if you don’t want React Query to refetch when tab is focused again:
    },
  },
});
// steps 2 and 3 to keep data even after user refresh the page, then try to read it in protectedRoutes component, when user refresh the page react query and redux reseted (lost their values)
// 2. Create a persister (using localStorage)
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});
// 3. Apply persistence
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60, // 1 hour
});
function App() {
  const dispatch = useAppDispatch();
  useEffect(
    function () {
      const themeFromStorage = checkDefaultTheme();
      dispatch(storeDarkThemeInRedux(themeFromStorage));
    },
    [dispatch]
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/verifiedEmailAddress"
            element={<VerifiedEmailAddress />}
          />
          <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
          <Route
            element={
              <ProtectedRoutes>
                <AppLayOut />
              </ProtectedRoutes>
            }
          >
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout/:orderId" element={<CheckOut />} />
            <Route path="/return" element={<Return />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        gutter={12} // space between window and toaster
        containerStyle={{ margin: "4px" }}
        toastOptions={{
          blank: {
            duration: 2000,
            icon: "", // remove icon
          },
          success: {
            duration: 2000,
            icon: "", // 🔥 Remove success icon
          },
          error: {
            duration: 1000,
            icon: "", // ❌ Remove error icon
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "4px 12px",
            color: "var(--body-background-color)",
            background: "var(--text-color)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
export default App;
// 📝 Optional: If you wanted to render a default route inside the layout (e.g. /dashboard), then you'd do:

// <Route path="/dashboard" element={<AppLayOut />}>
//   <Route index element={<DashboardHome />} />
//   <Route path="stats" element={<StatsPage />} />
// </Route>
// Visiting /dashboard → renders AppLayOut + DashboardHome

// Visiting /dashboard/stats → renders AppLayOut + StatsPage
