import { useForm } from "react-hook-form";
import Wrapper from "../wrapper/LogInForm";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { FormLoginTypes } from "../utils/types";
import { useLogin } from "../../reactQuery/authentication/useLogin";
function LogInForm() {
  const { logIn, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, formState, handleSubmit, reset } =
    useForm<FormLoginTypes>();
  const { errors } = formState;
  function onsubmit(data: FormLoginTypes) {
    // console.log(data);
    logIn(data);
    reset();
  }
  return (
    <Wrapper onSubmit={handleSubmit(onsubmit)}>
      <h3>Log Into Bazzar</h3>
      <div className="form-row">
        <input
          disabled={isPending}
          placeholder="Email"
          autoComplete="email"
          type="email"
          id="email"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
        {errors?.email?.message && <span>{errors.email.message}</span>}
      </div>
      <div className="form-row">
        <span onClick={() => setShowPassword((s) => !s)} className="icon">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        <input
          disabled={isPending}
          placeholder="password"
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          id="password"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "Password (min 8 characters)",
            },
          })}
        />
        {errors?.password?.message && <span>{errors.password.message}</span>}
      </div>
      <button disabled={isPending} className="submit" type="submit">
        log in
      </button>
      <div className="action">
        <Link to="/forgetPassword">Forget password</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    </Wrapper>
  );
}

export default LogInForm;
