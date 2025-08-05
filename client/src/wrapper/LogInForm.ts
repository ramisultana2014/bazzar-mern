import styled from "styled-components";
const Wrapper = styled.form`
  margin-top: 1rem;
  border-radius: var(--border-radius-md);
  background: var(--body-background-color);
  background: transparent;
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 3rem 1rem;
  .form-row {
    display: grid;
    font-size: 1.4rem;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
    gap: 0.5rem;
    width: 100%;
    position: relative;
  }
  .show-password {
    position: relative;
  }
  .icon {
    font-size: 2rem;
    position: absolute;
    color: var(--text-color);
    right: 5%;
    top: 30%;
  }
  input {
    color: var(--text-color);
    padding: 15px 30px;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-md);
    width: 100%;
    background: var(--body-background-color);
  }
  span {
    color: var(--color-red-800);
    font-size: 1.6rem;
    font-weight: 500;
    position: absolute;
    bottom: -35%;
    opacity: 100;
  }

  .submit {
    font-size: 2rem;
    background-color: var(--color-brand-main-2);
    border-radius: var(--border-radius-md);
    box-shadow: 0 0 0 3px white;
    border: none;
    padding: 8px 20px;
    color: var(--color-grey-0);
    width: 100%;
    transition: all 1s;
  }
  .submit:hover {
    color: var(--color-brand-main-1);
  }
  .action {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.25rem;
  }
  a:link,
  a:visited {
    color: var(--color-brand-main-2);
    text-decoration: none;
    transition: all 1s;
  }
  a:hover,
  a:active {
    color: var(--color-brand-main-2);
    text-decoration: underline;
  }
  @media (min-width: 800px) {
    padding: 3rem 5rem;
    width: 50vw;
    a:link,
    a:visited {
      font-size: 1.6rem;
    }
  }
  @media (min-width: 1000px) {
    padding: 3rem 5rem;
    width: 40vw;
  }
`;
export default Wrapper;
