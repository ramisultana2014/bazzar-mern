import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { comparePassword } from "../utils/passwordUtils.js";
import { sendWelcomeEmail } from "../emails/email.js";
import {
  BadRequestError,
  InternalServerError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
// export const test = async (req, res) => {
//   console.log("test");
//   try {
//     res.status(200).render("email");
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
const codeGenerator = () =>
  Math.floor(100000 + Math.random() * 9000).toString();
export const register = async (req, res) => {
  try {
    // const isFirstAccount = (await UserModel.countDocuments()) === 0;
    // req.body.role = isFirstAccount ? "admin" : "user";
    // const hashed = await hashPassword(req.body.password);
    // req.body.password = hashed;
    const verificationCode = codeGenerator();

    const newUser = await UserModel.create({ ...req.body, verificationCode });
    // send email

    sendWelcomeEmail(req.body.email, verificationCode);
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.cookie("bazzar", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      secure: process.env.NODE_ENV === "production",
    });
    newUser.password = undefined;
    //console.log("error check");
    res.status(StatusCodes.CREATED).json({
      msg: "please check your email",
      data: { newUser },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      throw new BadRequestError(messages.join(". "));
    } else if (err.code === 11000) {
      // For unique errors like email or storeName
      throw new BadRequestError("Email or store name already exists");
    } else {
      throw new InternalServerError("Something went wrong, please try again");
    }
  }
};
export const activateUserAccount = async (req, res) => {
  const bazzarCookie = req.cookies.bazzar;
  //401 not authorized
  if (!bazzarCookie) throw new UnauthenticatedError("please register first");

  const decoded = jwt.verify(bazzarCookie, process.env.JWT_SECRET);

  if (!decoded) throw new UnauthenticatedError("Invalid token");

  // { id: '66b238fa3ce7d0dd2caeef57', iat: 1723631928 }
  const user = await UserModel.findById(decoded.id);

  //401 not authorized
  if (!user) throw new UnauthenticatedError("invalid credential");
  const expirationTime = new Date(user.updatedAt).getTime() + 10 * 60 * 1000;
  if (user.isVerified === true) {
    throw new BadRequestError("you are already registered ");
  }

  if (
    user.verificationCode === req.body.verificationCode &&
    Date.now() < expirationTime
  ) {
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({ msg: "success", data: { user } });
  } else {
    throw new BadRequestError(" please request new code");
  }
};
export const requestNewCode = async (req, res) => {
  const verificationCode = codeGenerator();
  //console.log(verificationCode);
  const bazzarCookie = req.cookies.bazzar;

  if (!bazzarCookie) throw new UnauthenticatedError("please register first");

  const decoded = jwt.verify(bazzarCookie, process.env.JWT_SECRET);

  if (!decoded) throw new UnauthenticatedError("Invalid token");

  // { id: '66b238fa3ce7d0dd2caeef57', iat: 1723631928 }
  const user = await UserModel.findById(decoded.id);
  //401 not authorized
  if (!user) throw new UnauthenticatedError("invalid credential");
  if (user.isVerified === true) {
    throw new BadRequestError("you are already registered ");
  }
  user.verificationCode = verificationCode;
  await user.save({ validateBeforeSave: false });
  sendWelcomeEmail(user.email, verificationCode);
  res.status(StatusCodes.OK).json({
    msg: "please check your email",
  });
};
export const codeToResetPassword = async (req, res) => {
  const verificationCode = codeGenerator();
  //console.log(verificationCode);

  const user = await UserModel.findOne({ email: req.body.email });
  //401 not authorized
  if (!user) throw new UnauthenticatedError("invalid credential");
  if (!user.isVerified) {
    throw new BadRequestError("please activate your account  ");
  }
  user.verificationCode = verificationCode;
  await user.save({ validateBeforeSave: false });
  sendWelcomeEmail(user.email, verificationCode);
  res.status(StatusCodes.OK).json({
    msg: "please check your email",
  });
};
export const ForgetPassword = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("No account found with that email");
  if (!user.isVerified) {
    throw new BadRequestError(" account need to activate");
  }
  if (user.verificationCode === req.body.verificationCode) {
    user.password = req.body.password;
    await user.save({ validateBeforeSave: false });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    //console.log("token", token);
    res.cookie("bazzar", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      secure: process.env.NODE_ENV === "production",
    });

    //console.log(user);
    res.status(StatusCodes.OK).json({
      msg: "success",
    });
  } else {
    throw new BadRequestError("you don't have permission ");
  }
};
export const login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email }).select(
    "+password"
  );

  //401 not authorized
  if (!user) throw new UnauthenticatedError("please sign up");
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );
  //401 not authorized
  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");
  if (!user.isVerified)
    throw new UnauthenticatedError("please activate your account ");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  // cookie and token prefer have the same expire time
  res.cookie("bazzar", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: process.env.NODE_ENV === "production",
  });
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    msg: `${user.name} logged in`,
    data: { user },
  });
};
export const protectedRoutesInClientSide = async (req, res) => {
  const bazzarCookie = req.cookies.bazzar;
  //console.log("belovedsCookie", belovedsCookie);
  if (!bazzarCookie)
    throw new UnauthenticatedError("You don't have permission");

  let decoded;
  try {
    decoded = jwt.verify(bazzarCookie, process.env.JWT_SECRET);
  } catch (err) {
    throw new UnauthenticatedError("Invalid token");
  }
  // { id: '66b238fa3ce7d0dd2caeef57', iat: 1723631928 }
  const user = await UserModel.findById(decoded.id);
  //401 not authorized
  if (!user) throw new UnauthenticatedError("invalid credential");
  res.status(200).json({ msg: "success" });
};
export const logout = (req, res) => {
  res.clearCookie("bazzar", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // or "none" if cross-site
  });
  res.status(StatusCodes.OK).json({ msg: " logged out!" });
};
export const protectedRouterInServer = async (req, res, next) => {
  const bazzarCookie = req.cookies.bazzar;
  //console.log("belovedsCookie", belovedsCookie);
  if (!bazzarCookie)
    throw new UnauthenticatedError("You don't have permission");

  const decoded = jwt.verify(bazzarCookie, process.env.JWT_SECRET);
  // { id: '66b238fa3ce7d0dd2caeef57', iat: 1723631928 }
  const user = await UserModel.findById(decoded.id);
  //401 not authorized
  if (!user) throw new UnauthenticatedError("invalid credential");
  if (!user.isVerified)
    throw new UnauthenticatedError("please activate your account ");
  req.user = user;
  next();
};
export const routerInServerForAdmin = async (req, res, next) => {
  const bazzarCookie = req.cookies.bazzar;
  //console.log("belovedsCookie", belovedsCookie);
  if (!bazzarCookie)
    throw new UnauthenticatedError("You don't have permission");

  const decoded = jwt.verify(bazzarCookie, process.env.JWT_SECRET);
  // { id: '66b238fa3ce7d0dd2caeef57', iat: 1723631928 }
  const user = await UserModel.findById(decoded.id);
  //401 not authorized
  if (!user) throw new UnauthenticatedError("invalid credential");
  if (!user.isVerified)
    throw new UnauthenticatedError("please activate your account ");
  if (user.role !== "admin")
    throw new UnauthenticatedError("you don't have permission ");
  req.user = user;
  next();
};
