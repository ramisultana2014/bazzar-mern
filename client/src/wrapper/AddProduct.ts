import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--border-radius-lg);
  width: 70vw;
  //margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  /* justify-items: center; */
  gap: 1rem;
  padding: 8px 16px;
  background-color: var(--body-background-color);

  h3 {
    text-align: left;
  }
  form {
    //border: 3px solid black;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-left: 2rem;
  }
  .image-container {
    border-radius: 8px;
    position: absolute;
    /* border: 2px solid red; */
    display: flex;
    justify-content: center;
    right: 5%;
    top: 17%;
    width: 50%;
  }
  img {
    width: fit-content;
    height: 300px;
    object-fit: contain;
    border: 2px solid var(--text-color);
    border-radius: 8px;
  }
  input::placeholder {
    text-align: left;
    color: var(--text-color);
  }
  input {
    width: 70%;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    padding: 4px;
    font-size: 1.4rem;
    height: 3rem;

    background: var(--body-background-color);
  }
  /* this code just to remove arrows from input number */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
  select {
    width: 70%;
    text-align: center;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    padding: 4px;
    font-size: 1.4rem;
    height: 3rem;
    background: var(--body-background-color);
  }
  option {
    text-align: left;
  }
  label {
    /* border: 2px solid black; */
    text-align: left;
    width: 70%;
    height: 3rem;
    padding: 4px;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
  }
  input[type="file"] {
    position: absolute;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    z-index: -1;
  }
  .custom-file-upload {
    display: inline-block;
    padding: 6px 12px;

    cursor: pointer;
  }
  .custom-file-upload:hover {
    color: var(--text-color);
  }
  .btns {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
  .btn {
    background: none;
    border: none;
    display: inline-block;
    transition: all 0.5s;
    border-radius: var(--border-radius-md);
    color: var(--text-color);
  }
  .submit {
    font-size: 1.4rem;
    background-color: var(--color-brand-main-2);
    border-radius: var(--border-radius-md);
    border: 2px solid var(--color-grey-0);
    box-shadow: 0 0 0 3px var(--text-color);
    padding: 4px 8px;
    width: 20%;
  }
  .submit:hover {
    background-color: transparent;
    /* color: var(--color-brand-main-2); */
  }

  .cancel:hover {
    color: var(--color-red-800);
  }
  @media (max-width: 700px) {
    width: 90vw;
    h3 {
      font-size: 1.6rem;
    }
    form {
      margin-left: 0;
    }
    .image-container {
      position: static;
    }
    img {
      width: fit-content;
      height: fit-content;
    }
    .submit {
      width: 40%;
    }
  }
`;

export default Wrapper;
//  <HiPencil /> update product
