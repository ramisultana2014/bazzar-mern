import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import type {
  ComponentPropsWithoutName,
  ComponentPropsWithoutNameToOpenWindow,
  ComponentWithChildren,
} from "../utils/types";
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  border: 1px solid var(--color-brand-main-2);
  transform: translate(-50%, -50%);
  background-color: var(--body-background-color);
  border-radius: var(--border-radius-lg);
  /* box-shadow: var(--shadow-lg); */
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;
const ButtonX = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
      stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
type ModalContextType = {
  openName: string;
  setOpenName: React.Dispatch<React.SetStateAction<string>>;
  closewindow: () => void;
};
const ModalContext = createContext<ModalContextType | null>(null);
function Modal({ children }: ComponentWithChildren) {
  const [openName, setOpenName] = useState("");
  const closewindow = () => setOpenName("");
  return (
    <ModalContext.Provider value={{ openName, setOpenName, closewindow }}>
      <span>{children}</span>
    </ModalContext.Provider>
  );
}

function Open({ children, nameToOpenWindow }: ComponentPropsWithoutName) {
  // the children is button we clone it and add onClick to it
  //when click we add nameToOpenWindow to openName
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal");

  return cloneElement(children, {
    onClick: () => ctx.setOpenName(nameToOpenWindow),
  });
}
function Window({ children, name }: ComponentPropsWithoutNameToOpenWindow) {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("Modal");
  const { openName, closewindow } = ctx;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(
    function () {
      function handleClick(e: Event) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          closewindow();
        }
      }
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    },
    [closewindow]
  );
  if (name !== openName) return null;
  return createPortal(
    // the children is component that will handle logic like update - delete, update
    //closeWindow is now pass to children du to clone so to use we write it as props in  children
    <Overlay>
      <StyledModal ref={ref}>
        <ButtonX onClick={closewindow}>
          <HiXMark />
        </ButtonX>
        <>{cloneElement(children, { closewindow })}</>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
Modal.Open = Open;
Modal.Window = Window;
export default Modal;
