import { useForm, type FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { FormForgetPasswordTypes } from "../utils/types";
import toast from "react-hot-toast";
import Wrapper from "../wrapper/SignupForm";
import { useForgetPassword } from "../../reactQuery/authentication/useForgetPassword";
import { useAppSelector } from "../hooks";
//import { useEffect } from "react";
function ForgetPasswordForm() {
  const email = useAppSelector((store) => store.userState.email);
  const { forgetPassword, isPending } = useForgetPassword();
  const { register, handleSubmit, reset, getValues, setValue } =
    useForm<FormForgetPasswordTypes>();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (email) {
  //     setValue("email", email);
  //   }
  // }, [email, setValue]);
  function onsubmit(data: FormForgetPasswordTypes) {
    //console.log(data);
    const verificationCode = data.verificationCode.trim();
    forgetPassword({ ...data, verificationCode });
    reset();
  }
  const onError = (errors: FieldErrors<FormForgetPasswordTypes>) => {
    if (errors.email) {
      toast.error(errors.email.message as string);
    }
    if (errors.password) {
      toast.error(errors.password.message as string);
    }
    if (errors.passwordConfirm) {
      toast.error(errors.passwordConfirm.message as string);
    }
  };
  return (
    <Wrapper onSubmit={handleSubmit(onsubmit, onError)}>
      <h3>reset your password</h3>
      <div className="reset-password">
        <input
          disabled={isPending}
          placeholder="Email"
          autoComplete="email"
          type="hidden"
          id="email"
          {...register("email")}
        />
        <input
          disabled={isPending}
          placeholder="verificationCode"
          autoComplete="verificationCode"
          type="text"
          id="verificationCode"
          {...register("verificationCode", {
            required: " password is  required",
            minLength: {
              value: 6,
              message: "Password (min 6 characters)",
            },
            maxLength: {
              value: 6,
              message: "Password (max 6 characters)",
            },
          })}
        />
        <input
          disabled={isPending}
          placeholder="password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: " password is  required",
            minLength: {
              value: 8,
              message: "Password (min 8 characters)",
            },
          })}
        />

        <input
          disabled={isPending}
          placeholder="passwordConfirm"
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "passwordConfirm is required",
            validate: (value) =>
              value === getValues().password || "passwords need to be match",
          })}
        />
      </div>
      <div className="btns">
        <button
          disabled={isPending}
          className="submit"
          type="submit"
          onClick={() =>
            setValue("email", email, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        >
          reset
        </button>
        <button disabled={isPending} type="reset" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </Wrapper>
  );
}
export default ForgetPasswordForm;
