import type {
  emailForResetPasswordType,
  FormForgetPasswordTypes,
  FormLoginTypes,
  FormSignupTypes,
  ServerErrorResponse,
  ServerRegisterResponse,
} from "../src/utils/types";

export async function registerApi(
  registerObj: FormSignupTypes
): Promise<ServerRegisterResponse> {
  try {
    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerObj),
    });
    //console.log("res in front end", res);
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    // all the throw error will be caught in reactQuery bu onError
    const data: ServerRegisterResponse = await res.json();
    //console.log("data", data);
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
export async function verifiedEmailAddress(obj: {
  verificationCode: string;
}): Promise<ServerRegisterResponse> {
  try {
    const res = await fetch(`/api/v1/auth/activateUserAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(obj),
    });
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      throw new Error(errorData.msg || "Something went wrong");
    }

    const data: ServerRegisterResponse = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}

export async function requestNewCode(): Promise<{ msg: string }> {
  try {
    const res = await fetch(`/api/v1/auth/requestNewCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();

      throw new Error(errorData.msg || "Something went wrong");
    }
    const data: { msg: string } = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
export async function codeToResetPasswordApi(
  obj: emailForResetPasswordType
): Promise<{ msg: string }> {
  try {
    const res = await fetch(`/api/v1/auth/codeToResetPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      throw new Error(errorData.msg || "Something went wrong");
    }
    const data: { msg: string } = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
export async function forgetPassword(
  obj: FormForgetPasswordTypes
): Promise<{ msg: string }> {
  try {
    const res = await fetch(`/api/v1/auth/forgetPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      throw new Error(errorData.msg || "Something went wrong");
    }
    const data: { msg: string } = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
export async function loginApi(
  loginObj: FormLoginTypes
): Promise<ServerRegisterResponse> {
  try {
    const res = await fetch(`/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //credentials: "include",
      body: JSON.stringify(loginObj),
    });
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      throw new Error(errorData.msg || "Something went wrong");
    }
    const data: ServerRegisterResponse = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
export async function protectedRoutes(): Promise<{ msg: string }> {
  try {
    const res = await fetch(
      `/api/v1/auth/validate-for-protectedRoutesInClientSide`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      throw new Error(errorData.msg || "Something went wrong");
    }
    const data: { msg: string } = await res.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
export async function logout(): Promise<{ msg: string }> {
  try {
    const res = await fetch(`/api/v1/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    //if (!res.ok) throw new Error("something went wrong");
    const data: { msg: string } = await res.json();
    // console.log("api", data);
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
