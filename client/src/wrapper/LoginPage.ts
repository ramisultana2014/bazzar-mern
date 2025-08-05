import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0 1rem;
  display: grid;
  justify-items: center;

  p {
    text-align: justify;
    letter-spacing: 1px;
    line-height: 1.5;
  }

  @media (min-width: 1000px) {
    p {
      width: 50%;
    }
  }
`;

export default Wrapper;
