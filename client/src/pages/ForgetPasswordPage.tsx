import { useForm, type FieldErrors } from "react-hook-form";
import { ForgetPasswordForm, Logo } from "../components";
import type { emailForResetPasswordType } from "../utils/types";

import Wrapper from "../wrapper/SignupPage";
import toast from "react-hot-toast";
import { useAppDispatch } from "../hooks";
import { emailForResetPassword } from "../context/userSlice";
import { useState } from "react";
import { useCodeForResetPassword } from "../../reactQuery/authentication/useAskCodeToRsetPassword";
function ForgetPasswordPage() {
  const { codeForResetPassword, isPending } = useCodeForResetPassword();
  const { register, handleSubmit } = useForm<emailForResetPasswordType>();
  const [userEmail, setUserEmail] = useState("");
  const dispatch = useAppDispatch();
  function onsubmit(data: emailForResetPasswordType) {
    //console.log(data);
    codeForResetPassword(data, {
      onSuccess() {
        dispatch(emailForResetPassword(data.email));
        setUserEmail(data.email);
      },
    });
  }
  const onError = (errors: FieldErrors<emailForResetPasswordType>) => {
    if (errors.email) {
      toast.error(errors.email.message as string);
    }
  };

  return (
    <Wrapper>
      <Logo />
      <form onSubmit={handleSubmit(onsubmit, onError)}>
        <input
          disabled={isPending}
          placeholder="enter your email"
          autoComplete="email"
          type="email"
          id="email"
          {...register("email", {
            required: "valid email required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
        <button>send </button>
      </form>
      {userEmail && <ForgetPasswordForm />}
    </Wrapper>
  );
}
export default ForgetPasswordPage;
