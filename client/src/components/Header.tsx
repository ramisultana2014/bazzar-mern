import { LuSearch } from "react-icons/lu";
//import { HiOutlineMenuAlt1 } from "react-icons/hi";
import type { User } from "../context/userSlice";
import { useDebouncedCallback } from "use-debounce";
import { Link, useSearchParams } from "react-router-dom";
import { IoBagOutline } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";
import { useAppSelector } from "../hooks";
//import { RiShoppingBag4Line } from "react-icons/ri";
function Header({ userFromRedux }: { userFromRedux: User }) {
  const [, setSearchParams] = useSearchParams();
  const cart = useAppSelector((store) => store.orderState.order.cart);
  const handleSearch = useDebouncedCallback((value) => {
    // React Router’s searchParams is a URLSearchParams instance. When you call set(), it mutates the object in-place, which may confuse React into thinking nothing changed.
    const newParams = new URLSearchParams();
    // const newParams = new URLSearchParams(searchParams);
    // Currently, if the user deletes the text, the URL will still be ?search= , so by if (value.trim() === "") we remove it
    if (value.trim() === "") {
      newParams.delete("search");
    } else {
      newParams.set("search", value);
    }
    setSearchParams(newParams);
  }, 500);
  return (
    //css in AppLayOut.ts
    <header>
      {/* <button className="menu-button">
        <HiOutlineMenuAlt1 />
      </button> */}
      <h1>Bazzar hup</h1>
      <div className="search">
        <input
          aria-label="Search"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />

        <LuSearch />
      </div>
      <div className="flex">
        {cart.length === 0 && <IoBagOutline className="cart-svg" />}
        {cart.length > 0 && (
          <Link to="/cart" className="cart-svg-a">
            <IoBagCheckOutline className="cart-svg" />
          </Link>
        )}

        <p>{userFromRedux.storeName}</p>
      </div>
    </header>
  );
}
export default Header;
