import styled from "styled-components";
const Wrapper = styled.div`
  //border: 3px solid red;
  /* box-shadow: var(--shadow-lg); */
  border-radius: var(--border-radius-lg);
  width: 50vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 1rem;
  padding: 8px 16px;
  background-color: var(--body-background-color);
  h3 {
    text-align: center;
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
    border-radius: 8px;
  }
  form {
    //border: 3px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  /* input[type="file"] {
    visibility: hidden;
  
  } */
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
  @media (max-width: 700px) {
    width: 70vw;
    h3 {
      font-size: 1.6rem;
    }
    img {
      width: 70%;
    }
  }
`;

export default Wrapper;
