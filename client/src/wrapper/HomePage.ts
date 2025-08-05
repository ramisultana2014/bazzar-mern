import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;

  .pagination-container {
    justify-self: center;
  }
  button {
    border: none;
    background: none;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    background: var(--body-background-color);
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.5s ease-in;
    font-size: 2rem;
  }
  button:hover {
    color: var(--color-brand-main-2);
  }
  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }
  button svg {
    width: 2rem;
    height: 2rem;
  }
  .active {
    color: var(--color-brand-main-2);
  }
  .sort-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    margin: 1rem 0;
  }
  .page-container {
    display: flex;
    border: 1px solid var(--text-color);
    border-radius: 8px;
    padding: 6px 12px;
  }
  /* container is  for ProductCard  */
  .container {
    margin-top: 3rem;
    /* overflow: scroll; */
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* border: 2px solid black; */
    gap: 1rem;
    padding: 8px;
  }

  .productCard {
    border: 0.5px solid var(--text-color);
    position: relative;
    display: grid;
    width: fit-content;
    border-radius: 8px;
    border-radius: 4px;

    .image-container {
      justify-self: center;
    }

    img {
      width: fit-content;
      height: 25rem;
      aspect-ratio: 1;
    }
    .productCard-info {
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .add {
      font-size: 1.4rem;
      width: fit-content;
      border: 1px solid var(--text-color);
      border-radius: 8px;
      padding: 4px 8px;
      transition: color 0.5s ease-in;
    }
    .add:hover {
      border: 1px solid var(--color-brand-main-2);
    }
  }
  .out-of-sale {
    filter: grayscale(90%);
  }
  @media screen and (max-width: 768px) {
    .container {
      margin-top: 6rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 500px) {
    .container {
      grid-template-columns: 1fr;
      justify-items: center;
      margin-top: 2rem;
    }
    .productCard {
      img {
        width: 100%;

        aspect-ratio: 1/1;
      }
    }
    .sort-container {
      margin: 0;
    }
    .page-container {
      gap: 2rem;
      margin-top: 1rem;
    }
  }
`;

export default Wrapper;
