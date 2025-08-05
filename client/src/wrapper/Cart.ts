import styled from "styled-components";
const Wrapper = styled.div`
  height: 50vh;
  background: var(--body-background-color);

  display: grid;
  //align-items: center;
  grid-template-columns: 1fr;
  justify-items: center;
  padding: 4.8rem;

  table {
    border-collapse: collapse;
    width: fit-content;
    text-align: center;
  }

  tr {
  }
  th {
    background-color: var(--color-brand-main-2);

    padding: 1rem;
    width: 2rem;
  }
  td {
    border-bottom: 1px solid var(--color-brand-main-2);
    border-left: 1px solid var(--color-brand-main-2);
    border-right: 1px solid var(--color-brand-main-2);
    padding: 1rem 0;
    width: 15rem;
  }
  .no-border {
    border-left: none;
    border-right: none;
  }
  .no-border-left {
    border-left: none;
  }
  img {
    width: fit-content;
    height: 5em;
    aspect-ratio: 1;
    border-radius: 8px;
  }

  button {
    background: none;
    border: none;
    width: 2rem;
    height: 2rem;
    transition: all 0.5s;
  }
  button:hover {
    /* scale: 2; */
    color: var(--color-red-800);
  }
  .payment {
    display: flex;
    align-items: center;
    margin-top: 2rem;
    width: fit-content;
    border: 2px solid var(--color-red-800);
    padding: 8px 24px;
    border-radius: 20px;
    height: 4rem;
  }
  .payment:hover {
    color: var(--color-brand-main-2);
    border: 2px solid var(--color-brand-main-2);
  }
`;
export default Wrapper;
