import { Router } from "express";
import {
  validateForgetPassword,
  validateLoginInput,
  validateRegisterInputs,
  validateVerificationCode,
} from "../middleware/validationMiddleware.js";
import {
  activateUserAccount,
  codeToResetPassword,
  ForgetPassword,
  login,
  logout,
  protectedRoutesInClientSide,
  register,
  requestNewCode,
} from "../controller/authController.js";
const router = Router();
//import { test } from "../controller/authController.js";
//router.get("/email", test); // this route to design the email

router.post("/register", validateRegisterInputs, register);
router.post(
  "/activateUserAccount",
  validateVerificationCode,
  activateUserAccount
);
router.post("/requestNewCode", requestNewCode);
router.post("/forgetPassword", validateForgetPassword, ForgetPassword);
router.post("/login", validateLoginInput, login);
router.post("/codeToResetPassword", codeToResetPassword);
router.get(
  "/validate-for-protectedRoutesInClientSide",
  protectedRoutesInClientSide
);
router.post("/logout", logout);
export default router;
// the req will first arrive to validateRegisterInput or validateLoginInput they will look for the body and the actual error will come from withValidationErrors with the message we provide coming from validateRegisterInput or validateLoginInput . that error   catch by express-async-errors in server.js and send it down to app.use((err, req, res, next)
