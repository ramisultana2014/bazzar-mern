import { useNavigate } from "react-router-dom";
import Wrapper from "../wrapper/PageNotFound";
import { useAppDispatch } from "../hooks";
import { useEffect } from "react";
import { clearOrderInRedux } from "../context/orderSlice";

function Thanks({ email }: { email: string }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearOrderInRedux());
    const timer = setTimeout(() => {
      navigate("/homepage");
    }, 2000); // 3 seconds delay before redirecting

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);
  return (
    <Wrapper>
      <div className="box">
        <p>
          Thanks for your purchase 🎉 <br />
          email was sent to {email}
          <br />
          Redirecting you to homePage...
        </p>
      </div>
    </Wrapper>
  );
}
export default Thanks;
