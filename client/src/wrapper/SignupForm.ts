import styled from "styled-components";

const Wrapper = styled.form`
  box-shadow: var(--shadow-lg);
  border-radius: var(--border-radius-md);
  padding: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 70vh;
  color: var(--text-color);
  background-color: var(--body-background-color);
  h3 {
    text-align: center;
  }
  .user-info {
    display: grid;
    align-items: center;
    justify-items: center;
    gap: 1rem;
    position: relative;
  }
  .phone {
    text-align: center;
  }
  .phone::placeholder {
    text-align: center;
  }
  input::placeholder {
    text-align: center;
  }
  input {
    width: 80%;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    padding: 4px;
    font-size: 1.4rem;
    text-align: center;
    color: var(--text-color);
    background-color: var(--body-background-color);
  }
  select {
    width: 80%;
    text-align: center;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    padding: 4px 12px;

    //color: var(--body-background-color);
    color: var(--text-color);
    background-color: var(--body-background-color);
  }
  p {
    /* border: 1px solid var(--text-color); */
    //border: 1px solid light-dark(#111827, #f9fafb);
    width: fit-content;
    //border-radius: var(--border-radius-sm);
    padding: 2px 4px;
    background: var(--body-background-color);
    //background: light-dark(#f9fafb, #111827);
    font-size: 1.4rem;
    position: absolute;
    left: 12%;
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    button {
      padding: 2px 12px;
      border-radius: var(--border-radius-md);
      border: none;

      //color: var(--body-background-color);
    }
  }
  .submit {
    font-size: 2rem;
    background: none;
    transition: all 0.5s;
    color: var(--body-background-color);

    background: var(--color-brand-main-2);
  }
  .submit:hover {
    color: var(--text-color);
  }
  .reset {
    color: red;
    background: none;
  }
  .reset-password {
    display: grid;
    grid-template-columns: 30rem;
    justify-items: center;
    gap: 1rem;
  }
  .full-width {
    width: 100%;
  }
`;

export default Wrapper;
