import { Outlet } from "react-router-dom";
import Wrapper from "../wrapper/AppLayOut";
import { Aside, Footer, Header } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
import { checkDefaultTheme } from "../utils/theme";
import { storeDarkThemeInRedux } from "../context/userSlice";

function AppLayOut() {
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const dispatch = useAppDispatch();
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme.toString());
    dispatch(storeDarkThemeInRedux(newDarkTheme));
    // then in Profile we read redux to set cover and profile image  depends on the theme for the first render.
  };
  const userFromRedux = useAppSelector((state) => state?.userState?.user);
  return (
    // isDarkTheme={isDarkTheme ? "true" : ""} is used to gave the input(Header) different background
    <Wrapper isdarktheme={isDarkTheme ? "true" : ""}>
      <Header userFromRedux={userFromRedux} />
      <Aside toggleDarkTheme={toggleDarkTheme} isDarkTheme={isDarkTheme} />
      <main>
        <Outlet />
      </main>
      <Footer userFromRedux={userFromRedux} />
    </Wrapper>
  );
}
export default AppLayOut;
{
  /* <Wrapper>
  <Header /> in component <header></header> 
  <Aside /> in component <aside></aside> 
  <main><Outlet /></main> 
  <Footer />
</Wrapper> */
  // the Wrapper is AppLayOut each component must have like
  // grid-area: header;
  // grid-area: aside;
}
