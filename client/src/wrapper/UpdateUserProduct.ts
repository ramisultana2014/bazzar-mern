import styled from "styled-components";
const Wrapper = styled.form`
  //border: 3px solid black;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 50vw;
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
    width: fit-content;
  }
  .submit:hover {
    background-color: transparent;
    /* color: var(--color-brand-main-2); */
  }

  .cancel:hover {
    color: var(--color-red-800);
  }
  @media (max-width: 700px) {
    width: 70vw;
    h3 {
      font-size: 1.6rem;
    }

    .submit {
      width: 40%;
    }
  }
`;

export default Wrapper;
