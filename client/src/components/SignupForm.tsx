import { useNavigate } from "react-router-dom";

import Wrapper from "../wrapper/SignupForm";
import { useForm, type FieldErrors } from "react-hook-form";
import {
  findCountryByCode,
  formattedCountries,
  validatePhone,
} from "../utils/countries";
import { useEffect, useState } from "react";
import type { CountryObject, FormSignupTypes } from "../utils/types";
import toast from "react-hot-toast";
import { useCreateRegister } from "../../reactQuery/authentication/useRegister";
function SignupForm() {
  const { signup, isPending } = useCreateRegister();
  const [countryName, setCountryName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<
    CountryObject | undefined
  >(undefined);
  const { register, formState, handleSubmit, reset, getValues } =
    useForm<FormSignupTypes>();
  const { errors } = formState;
  const navigate = useNavigate();
  function onsubmit(data: FormSignupTypes) {
    //console.log(data);
    //setCountryName("");
    signup(data, {
      onSuccess() {
        reset();
      },
    });
  }
  const onError = (errors: FieldErrors<FormSignupTypes>) => {
    if (errors.name) {
      toast.error(errors.name.message as string);
    }
    if (errors.storeName) {
      toast.error(errors.storeName.message as string);
    }
    if (errors.phoneNumber) {
      toast.error(errors.phoneNumber.message as string);
    }
    if (errors.password) {
      toast.error(errors.password.message as string);
    }
    if (errors.passwordConfirm) {
      toast.error(errors.passwordConfirm.message as string);
    }
  };
  useEffect(
    function () {
      const country = findCountryByCode(countryName);
      setSelectedCountry(country);
    },
    [countryName]
  );
  return (
    <Wrapper onSubmit={handleSubmit(onsubmit, onError)}>
      <h3>create new account</h3>
      <div className="user-info">
        {/* string contains only alphabetic letters  */}
        <input
          type="text"
          id="name"
          disabled={isPending}
          placeholder="First name"
          {...register("name", {
            required: "name is required",
            maxLength: 10,
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "please provide valid name",
            },
          })}
        />
        <input
          type="text"
          placeholder="Last name"
          id="lastName"
          disabled={isPending}
          {...register("lastName", {
            required: true,
            pattern: {
              value: /^[A-Za-z]+$/i, //matches a string consisting only of one or more letters (uppercase or lowercase) and nothing else
              message: "please provide valid last name",
            },
          })}
        />
      </div>
      <div className="user-info">
        <select
          id="country"
          disabled={isPending}
          {...register("country", {
            required: true,
          })}
          onChange={(e) => setCountryName(e.target.value)}
        >
          <option value="">Country</option>

          {formattedCountries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.flag} {country.name}
            </option>
          ))}
        </select>
      </div>
      <div className="user-info">
        <p>{selectedCountry ? selectedCountry.phoneCode : "+"}</p>
        {/* <input
          type="tel"
          id="phoneNumber"
          {...register("phoneNumber", {
            required: "required",
            pattern: {
              value:
                /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
              message: "Not Valid",
            },
          })}
          placeholder="phoneNumber"
        /> */}
        <input
          className="phone"
          type="tel"
          id="phoneNumber"
          disabled={isPending}
          placeholder="Phone number"
          {...register("phoneNumber", {
            required: "Phone number is required",
            validate: (value) => {
              if (!selectedCountry) return "Select a country first";
              const isValid = validatePhone(value, selectedCountry.code);
              return isValid || "Invalid phone number for selected country";
            },
            //with pattern we need to write message:'...'
            //but with validate we can just  write as above
          })}
        />
      </div>
      <div className="user-info">
        <input
          placeholder="store name"
          autoComplete="storeName"
          type="text"
          id="storeName"
          disabled={isPending}
          {...register("storeName", {
            required: "storeName is required",
            maxLength: 20,
            pattern: {
              value: /^[A-Za-z0-9\s.,'"&\-():!?]+$/,
              message: "Please provide a valid storeName",
            },
          })}
        />
        {/* {errors?.storeName?.message && <span>{errors.storeName.message}</span>} */}
      </div>
      <div className="user-info">
        <input
          placeholder="Email"
          autoComplete="email"
          type="email"
          disabled={isPending}
          id="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
        {errors?.email?.message && <span>{errors.email.message}</span>}
      </div>
      <div className="user-info">
        <input
          placeholder="password"
          type="password"
          disabled={isPending}
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "Password (min 8 characters)",
            },
          })}
        />

        <input
          placeholder="passwordConfirm"
          type="password"
          disabled={isPending}
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "confirm password is required",
            validate: (value) =>
              value === getValues().password || "passwords need to be match",
          })}
        />
      </div>
      <div className="btns">
        <button disabled={isPending} className="submit" type="submit">
          {isPending ? "creating" : "register"}
        </button>
        <button
          disabled={isPending}
          type="reset"
          onClick={() => navigate("/")}
          className="reset"
        >
          Cancel
        </button>
      </div>
    </Wrapper>
  );
}
export default SignupForm;
