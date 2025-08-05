import styled from "styled-components";
const Wrapper = styled.div`
  .btns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
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
    font-size: 1.7rem;
    background-color: var(--color-brand-main-2);
    border-radius: var(--border-radius-md);
    border: 2px solid var(--color-grey-0);
    box-shadow: 0 0 0 3px var(--text-color);
    padding: 4px 12px;
    width: 100%;
  }
  .submit:hover {
    background-color: transparent;
    /* color: var(--color-brand-main-2); */
  }

  .cancel:hover {
    color: var(--color-red-800);
  }
`;

export default Wrapper;
