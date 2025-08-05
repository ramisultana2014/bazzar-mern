import styled, { css, keyframes } from "styled-components";
const Container = styled.div`
  padding: 8px;
  margin-top: 6rem;
  display: grid;
  gap: 1rem;
  justify-items: center;
  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const animate = keyframes`
      0% {
        background-color:var(--body-background-color); 
    }
    50%{
       background-color:#e5e7eb; 
    }
    75%{
      background-color: #d1d5db;
    }
    100% {
        
        background-color:#9ca3af;
    }

`;
const Skel = styled.div<{ type?: string }>`
  animation: ${animate} 1.5s linear infinite alternate;
  margin-bottom: 1rem;
  ${(props) =>
    props.type === "normal" &&
    css`
      height: 20rem;
      width: 20rem;
      /* aspect-ratio: 3/2; */
    `}
  ${(props) =>
    props.type === "med" &&
    css`
      height: 30rem;
      width: 20rem;
    `}
  ${(props) =>
    props.type === "small" &&
    css`
      height: 10rem;
      width: 10rem;
    `}
    @media screen and (min-width: 500px) {
    ${(props) =>
      props.type === "normal" &&
      css`
        width: 30rem;
      `}
  }
`;
function Skeleton() {
  return (
    <>
      <Container>
        <Skel type="normal" />
        <Skel type="normal" />
        <Skel type="normal" />
        <Skel type="normal" />
        <Skel type="normal" />
        <Skel type="normal" />
      </Container>
    </>
  );
}
export default Skeleton;
