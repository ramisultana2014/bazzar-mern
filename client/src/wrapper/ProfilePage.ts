import styled from "styled-components";

const Wrapper = styled.section`
  .image-container {
    /* border: 2px solid black; */
    position: relative;
  }
  .cover-photo {
    height: 20rem;
    /* width: 50%;
    margin: 0 auto; */
    width: 100%;
    display: block;
  }

  .profileImage {
    border: 2px solid var(--text-color);
    border-radius: 50%;
    width: 17rem;
    height: 17rem;
    /* position: absolute;
    bottom: -10%;
    left: 3%; */
  }

  .tooltip-image-text {
    position: absolute;
    left: 40%;
    opacity: 0;
    color: var(--text-color);
    transition: opacity 1s;
  }
  &:hover .tooltip-image-text {
    opacity: 1;
  }
  .user-products {
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
    }

    .minus-div {
      position: absolute;
      right: 4%;
      bottom: 22%;
      color: var(--text-color);
    }
  }
  @media screen and (max-width: 768px) {
    /* .cover-photo {
      height: 20rem;
      margin: 0;
      width: 100%;
      } */
    .profileImage {
      width: 12rem;
      height: 12rem;
      /* bottom: -25%; */
    }

    .user-products {
      margin-top: 6rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 500px) {
    .user-products {
      grid-template-columns: 1fr;
      justify-items: center;
    }
    .productCard {
      img {
        width: 100%;
        aspect-ratio: 1/1;
      }
    }
  }
`;

export default Wrapper;
//640 px 2 col 1fr
// 1000 3 col 1fr
