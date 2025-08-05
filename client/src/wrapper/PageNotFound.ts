import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  background: var(--body-background-color);
  display: flex;

  justify-content: center;
  padding: 3rem;
  .box {
    background: var(--body-background-color);

    border-radius: var(--border-radius-md);

    padding: 2rem 3rem;
    flex: 0 1 96rem;
    text-align: center;

    & p {
      color: var(--text-color);
      margin-bottom: 3.2rem;
    }
  }
  img {
    height: 12rem;
  }
  a:link,
  a:visited {
    color: var(--text-color);
    text-decoration: none;
    width: fit-content;
    display: inline-block;
    border: 2px solid var(--text-color);
    padding: 4px 12px;
    border-radius: 8px;
    transition: all 1s;
  }
  a:hover {
    background-color: var(--color-red-800);
    color: aliceblue;
  }
  @media screen and (max-width: 500px) {
    img {
      //visibility: hidden;
      height: 9rem;
    }
  }
`;

export default Wrapper;
