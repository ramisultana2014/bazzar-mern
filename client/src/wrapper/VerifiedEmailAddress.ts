import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  justify-items: center;

  gap: 10px;
  justify-content: center;
  margin-top: 2rem;
  h1 {
    font-size: larger;
  }
  .container {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  input {
    width: 50px;
    height: 50px;
    font-size: 24px;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s;
    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
  .code {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .act {
    background: none;
    border: none;
    text-decoration: underline;
    color: var(--color-brand-main-2);
    font-weight: 500;
    font-size: 1.8rem;
  }
  .act:hover {
    text-decoration: none;
  }
  .act:disabled {
    text-decoration: none;
  }
`;

export default Wrapper;
