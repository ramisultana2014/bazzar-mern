import styled from "styled-components";
const Wrapper = styled.section<{ isdarktheme: string }>`
  display: grid;
  /* grid-template-areas:
    "header header header header header"
    "aside  main main main main "
    "footer footer footer footer footer";
  grid-template-columns: 5rem 1fr 1fr 1fr 1fr; */
  /* grid-template-columns: auto 1fr; */
  grid-template-areas:
    "header header"
    "aside main"
    "footer footer";
  grid-template-columns: auto 1fr;

  grid-template-rows: 6rem 1fr 6rem;
  min-height: 100dvh;
  header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    h1 {
      color: var(--color-brand-main-2);
    }
    .menu-button {
      background-color: none;
      width: 4rem;
      visibility: hidden;
    }
    .search {
      position: relative;
      width: 50%;
    }
    .search svg {
      position: absolute;
      right: 5%;
      top: 20%;
      width: 2rem;
      height: 2rem;
    }
    input {
      border-radius: 50px;
      border: 1px solid var(--text-color);
      padding: 4px 20px;
      width: 100%;
      color: var(--text-color);
      background-color: ${(props) =>
        props.isdarktheme === "true"
          ? "var(--color-grey-800)"
          : "var(--color-grey-50)"};
    }
    input::placeholder {
      font-size: 1.6rem;
      color: var(--color-brand-main-2);
    }
    svg:hover {
      color: var(--color-brand-main-2);
    }
    p {
      font-weight: 600;
    }
    .cart-svg {
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }
    .cart-svg-a {
      color: var(--text-color);
    }
  }
  aside {
    grid-area: aside;
    width: 4rem;
    padding: 0 8px;
    overflow: hidden;
    transition: width 0.3s ease;
    z-index: 100;

    &:hover {
      width: 10rem;
    }
    /* to have different style commit:
     &:hover {
      width: 12rem;
    } */
    .nav-links {
      width: 100%;
      transition: width 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
      padding: 4px;
      width: 5rem;
      height: 15rem;
      position: fixed;
    }

    .nav-link {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
      color: var(--color-brand-main-2);
      cursor: pointer;
      transition: width 0.3s ease;
      text-decoration: none;
    }
    .active {
      color: var(--text-color);
    }
    .nav-link:hover {
      color: var(--text-color);
    }
    .nav-link-icon {
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
    }

    .nav-link-text {
      opacity: 0;
      font-size: 1.4rem;
      transition: opacity 0.3s ease;
    }
    .nav-link:hover .nav-link-text {
      opacity: 1;
    }
    .darkMode {
      margin-bottom: 2rem;
    }
    button {
      border: none;
      background: none;
      display: flex;
      width: 2rem;
      height: 2rem;
      color: var(--color-brand-main-2);
      position: relative;
    }
    button:hover {
      color: var(--text-color);
    }
    button svg {
      width: 2rem;
      height: 2rem;
      z-index: 1000;
    }
    button span {
      position: absolute;
      top: 50%;
      right: -240%;
      opacity: 0;
    }
    button:hover span {
      opacity: 1;
    }
    /* &:hover .nav-link-text {
      opacity: 1;
    } */
  }

  main {
    grid-area: main;
    /* border: 1px solid red; */
  }
  footer {
    grid-area: footer;
    position: relative;
    padding: 8px;
    display: flex;
    align-items: center;

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      width: fit-content;
    }
    .firstLetterOFUserEmail {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      border: 1px solid var(--text-color);
      display: flex;
      align-items: center;
      justify-content: center;

      color: var(--body-background-color);
      background-color: #9c36b5;
    }

    .user-info:hover .user-account {
      visibility: visible;
    }
    .copy-right {
      transform: translateX(100%);
    }
  }
  @media screen and (max-width: 768px) {
    /* grid-template-areas:
      "header header header header header"
      "main  main main main main"
      "footer footer footer footer footer";
    aside {
      display: none;
    } */
    header {
      h1 {
        display: none;
      }
      .menu-button {
        visibility: visible;
      }
      .search {
        width: 60%;
      }
    }
    .copy-right {
      display: none;
    }
  }
`;

export default Wrapper;
