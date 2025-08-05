import { LogInForm, Logo } from "../components";

import Wrapper from "../wrapper/LoginPage";

function LoginPage() {
  return (
    <Wrapper>
      <Logo />
      <p>
        We are modern shopping platform where you can easily create your own
        store, showcase your products, and start selling in minutes. Whether
        you're a seller or a buyer, Bazzar makes online shopping simple and
        smooth. Create your own store with ease Explore and buy a wide range of
        products Enjoy a secure and user-friendly shopping experience Start
        building your online business today with Bazzar Online
      </p>
      <LogInForm />
    </Wrapper>
  );
}
export default LoginPage;
