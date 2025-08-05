import Wrapper from "../wrapper/PageNotFound";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
function PageNotFound({ errorMessage }: { errorMessage?: string }) {
  return (
    <Wrapper>
      <div className="box">
        <div>
          <img src={logo} alt="bazzar" />
        </div>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <p> we are sorry , the page you are looking for could not be found</p>
        )}

        <Link to="/" replace={true}>
          Log in Page
        </Link>
      </div>
    </Wrapper>
  );
}

export default PageNotFound;
