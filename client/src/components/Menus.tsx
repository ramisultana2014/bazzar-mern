import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import type {
  ComponentListProps,
  ComponentWithChildren,
  TypeForToggleForImageMenuList,
} from "../utils/types";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.5s;

  &:hover {
    background-color: var(--body-background-color);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--text-color);
    &:hover {
      color: var(--color-brand-main-2);
    }
  }
`;
const StyledToggleForImageCoverMenuList = styled.button`
  height: 20rem;
  width: 50%;
  margin: 0 auto;
  display: block;
  border: none;
  @media screen and (max-width: 768px) {
    height: 20rem;
    margin: 0;
    width: 100%;
  }
`;
const StyledToggleForImageProfileMenuList = styled.button`
  border: none;
  width: 17rem;
  height: 17rem;
  position: absolute;
  background: none;
  bottom: -1%;
  left: 3%;
  @media screen and (max-width: 768px) {
    width: 12rem;
    height: 12rem;
    bottom: -25%;
  }
`;
const StyledList = styled.ul<{
  position: { x: number | null; y: number | null };
}>`
  position: fixed;
  padding: 4px;
  color: var(--text-color);
  z-index: 999;
  /* background-color: var(--color-brand-main-2); */
  /* box-shadow: var(--shadow-md); */
  border-radius: var(--border-radius-md);
  /* width: 24rem; */
  display: flex;
  flex-direction: column;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  & button {
    border: none;
    background-color: var(--body-background-color);
    color: var(--text-color);
    padding: 4px 12px;
    font-size: 1.4rem;
    width: 16rem;
    transition: color 0.5s;
    &:hover {
      color: var(--color-brand-main-2);
    }
  }
  @media (max-width: 700px) {
    font-size: 1.4rem;
  }
`;

type PositionType = { x: number | null; y: number | null };
type MenusContextType = {
  openId: string;
  close: () => void;
  setOpenId: React.Dispatch<React.SetStateAction<string>>;
  position: { x: number | null; y: number | null };
  setPosition: React.Dispatch<
    React.SetStateAction<{ x: number | null; y: number | null }>
  >;
};
const MenusContext = createContext<MenusContextType | null>(null);
function Menus({ children }: ComponentWithChildren) {
  const [openId, setOpenId] = useState("");

  const [position, setPosition] = useState<PositionType>({ x: null, y: null });
  const close = () => setOpenId("");

  return (
    <MenusContext.Provider
      value={{ openId, close, setOpenId, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: string }) {
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error("menus");
  const { openId, close, setOpenId, setPosition } = ctx;
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); // will stop the event from bubbling up after reach the target element
    //getVoundingClientReact it gave position for element
    //DOMRect{x: 873.984375, y: 259, width: 32, height: 32, top: 259,…}

    // const rect = e.currentTarget.getBoundingClientRect();
    const rect = (e.target as Element)
      .closest("button")!
      .getBoundingClientRect();
    //console.log(rect);
    setPosition({
      x: window.innerWidth - rect.width - rect.x - 50,
      y: rect.y + rect.height - 10,
    });

    if (openId === "" || openId !== id) {
      setOpenId(id);
    } else {
      close();
    }
  }
  return (
    // StyledToggle is button
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function ToggleForImageMenuList({
  name,
  children,
}: TypeForToggleForImageMenuList) {
  //children is the image
  //use it in Profile
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error("menus");
  const { openId, close, setOpenId, setPosition } = ctx;
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation(); // will stop the event from bubbling up after reach the target element
    //getBoundingClientReact it gave position for element
    //DOMRect{x: 873.984375, y: 259, width: 32, height: 32, top: 259,…}

    // const rect = e.currentTarget.getBoundingClientRect();
    const rect = (e.target as Element)
      .closest("button")!
      .getBoundingClientRect();
    //console.log(rect);
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height - 50,
    });

    if (openId === "" || openId !== name) {
      setOpenId(name);
    } else {
      close();
    }
  }
  if (name === "cover")
    return (
      // StyledToggle is button

      <StyledToggleForImageCoverMenuList onClick={handleClick}>
        {children}
      </StyledToggleForImageCoverMenuList>
    );
  return (
    // StyledToggle is button

    <StyledToggleForImageProfileMenuList onClick={handleClick}>
      {children}
    </StyledToggleForImageProfileMenuList>
  );
}
function List({ id, children }: ComponentListProps) {
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error("menus");
  const { openId, position, close } = ctx;
  const ref = useRef<HTMLUListElement>(null);
  useEffect(
    function () {
      function HandleClick(e: Event) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          close();
        }
      }
      document.addEventListener("click", HandleClick, false);
      return () => document.removeEventListener("click", HandleClick, false);
    },
    [close]
  );
  if (openId !== id) return null;
  return createPortal(
    // styledList is ul
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

Menus.Menu = Menu; //Menu is just div
Menus.Toggle = Toggle; //is just the dotted button to open the Menus.List, when click that dotted button will gave openId state the id of the image(item)
Menus.List = List; //  is ul with children(many Modal.Open) and the id of the image(item)  - if we click outside it will close
//Menus.Button = Button; // Button is button
Menus.ToggleForImageMenuList = ToggleForImageMenuList;
export default Menus;
