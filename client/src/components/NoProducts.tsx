import Wrapper from "../wrapper/PageNotFound";

function NoProducts({ errorMessage }: { errorMessage?: string }) {
  return (
    <Wrapper>
      <div className="box">
        <p>{errorMessage}</p>
      </div>
    </Wrapper>
  );
}
export default NoProducts;
