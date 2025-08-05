import logo from "../assets/logo.svg";
import dark from "../assets/darklogo.svg";

//className logo in the index.css
//logo-in-header in AppLayOut.ts
function Logo() {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  return (
    <img
      src={isDarkTheme ? dark : logo}
      alt="bazaare"
      className="logo logo-in-header"
    />
  );
}
export default Logo;
