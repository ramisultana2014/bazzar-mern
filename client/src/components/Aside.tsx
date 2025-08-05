import { NavLink } from "react-router-dom";
import { navLinks } from "../utils/navlinks";
import { useLogout } from "../../reactQuery/authentication/useLogOut";
import { CiLight } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineDarkMode } from "react-icons/md";
function Aside({
  toggleDarkTheme,
  isDarkTheme,
}: {
  toggleDarkTheme: () => void;
  isDarkTheme: boolean;
}) {
  const { logout } = useLogout();
  function handleLogOut() {
    logout();
  }
  return (
    //css in AppLayOut.ts
    //explanation in README
    <aside>
      <div className="nav-links">
        {navLinks.map((link) => (
          <NavLink to={link.path} className="nav-link" key={link.text} end>
            <link.icon className="nav-link-icon" />
            <span className="nav-link-text">{link.text}</span>
          </NavLink>
        ))}
        <button onClick={toggleDarkTheme} className="darkMode">
          {isDarkTheme ? <CiLight /> : <MdOutlineDarkMode />}
          <span>mode</span>
        </button>
        <button onClick={handleLogOut}>
          <TbLogout2 /> <span>logout</span>
        </button>
      </div>
    </aside>
  );
}
export default Aside;
