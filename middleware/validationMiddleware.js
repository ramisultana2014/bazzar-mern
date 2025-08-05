import { body, param, query, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import UserModel from "../models/UserModel.js";
import mongoose from "mongoose";
import ProductModel from "../models/ProductModel.js";

const withValidationErrors = (validateValues) => {
  //  validateValues is  an array, because to chain multi body(express-validator) we put them in array so that why validateValues is an array and look like:
  //[
  // body("name")
  //         .notEmpty()
  //         .withMessage("name is required")
  //         .isLength({ min: 10 })
  //         .withMessage("name must be at least 10 character"),
  //]
  // now we return [] because the  withValidationErrors have tow middleware first one is validateValues and second one is (req, res, next) , and in express if The route receives an array of middlewares then Express spreads this array and executes each middleware in order.
  // so first  validateValues will use body from express-validator  to check for inputs  then in (req, res, next) will catch error coming from body express-validator
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      //validationResult(req) have many methods one of them isEmpty(), which mean if there is errors(coming from validateValues) it will gave us false , if there is no errors it gave us true
      //console.log(errors);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        // BadRequestError =400  is good for signup and login  for missing or wrong credintal like email , password ....
        throw new BadRequestError(errorMessages);

        //errors in sample form be like
        //         // type: 'field',
        //         // value: '',
        //         // msg: 'name is required',
        //         // path: 'name',
        //         // location: 'body'

        // BadRequestError,NotFoundError .... instead of return res.status(400/401 ...).json, will create error catch by express-async-errors in server.js and send it down to app.use((err, req, res, next)
      }
      next();
    },
  ];
};
// the actual error that will catch by express-async-errors coming from  (!errors.isEmpty()){ throw new} inside withValidationErrors, so we  just write throw new Error like in validateRegisterInput
const nameRegex = /^[A-Za-z]+$/i;
const phoneRegex =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const spaceAndNumberAndLetters = /^[A-Za-z0-9\s.,'"&\-():!?]+$/;
const countryRegex = /^[A-Za-z\s'-]+$/;
// those below for learning
// const nameAndStringNumberRegex = /^[A-Za-z0-9\s'-]+$/;
// const numberRegex = /^\d+$/;
export const validateRegisterInputs = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .matches(nameRegex)
    .withMessage(
      "Name must contain only letters, spaces, hyphens, or apostrophes"
    ),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .matches(nameRegex)
    .withMessage(
      "Last name must contain only letters, spaces, hyphens, or apostrophes"
    ),
  body("country")
    .notEmpty()
    .withMessage("country is required")
    .matches(countryRegex)
    .withMessage(
      "country must contain only letters, spaces, hyphens, or apostrophes"
    ),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(phoneRegex)
    .withMessage("Phone number must contain only digits (8 to 15 characters)"),
  body("storeName")
    .notEmpty()
    .withMessage("storeName is required")
    .matches(spaceAndNumberAndLetters)
    .withMessage(
      "storeName must contain only letters, spaces, hyphens, or apostrophes"
    ),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email }).lean();
      if (user) throw new Error("email is already exist");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("passwordConfirm is required")
    .custom((passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password) {
        throw new Error("passwords do not match");
      }
      return true;
    }),
]);
export const validateForgetPassword = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email: email }).lean();
      if (!user) {
        throw new Error("No account found with this email");
      }
    }),
  body("verificationCode")
    .notEmpty()
    .withMessage("verificationCode is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("verificationCode must be exactly 6 characters long")
    .matches(/^\d{6}$/)
    .withMessage("verificationCode must be a 6-digit number"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("passwordConfirm is required")
    .custom((passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password) {
        throw new Error("passwords do not match");
      }
      return true;
    }),
]);
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);
export const validateVerificationCode = withValidationErrors([
  body("verificationCode")
    .notEmpty()
    .withMessage("verificationCode is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("verificationCode must be exactly 6 characters long")
    .matches(/^\d{6}$/)
    .withMessage("verificationCode must be a 6-digit number"),
  //     .isLength({ min: 6, max: 6 }) makes the intention clear (must be exactly 6 characters).

  // .matches(/^\d{6}$/) ensures it's a numeric string, not something like "123abc".
]);

export const validateUploadProduct = withValidationErrors([
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 4, max: 20 })
    .withMessage("title must be 20 characters long")
    .matches(spaceAndNumberAndLetters)
    .withMessage(
      "title must contain only letters, spaces, hyphens, or apostrophes"
    ),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 4, max: 50 })
    .withMessage("title must be 50 characters long")
    .matches(spaceAndNumberAndLetters)
    .withMessage(
      "description must contain only letters, spaces, hyphens, or apostrophes"
    ),
  body("category")
    .notEmpty()
    .withMessage("category is required")
    .matches(spaceAndNumberAndLetters)
    .withMessage(
      "category must contain only letters, spaces, hyphens, or apostrophes"
    ),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .custom((value) => {
      if (isNaN(Number(value)) || Number(value) <= 0) {
        throw new Error("Price must be a positive number");
      }
      return true;
    }),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .custom((value) => {
      if (isNaN(Number(value)) || Number(value) <= 0) {
        throw new Error("Quantity must be a positive number");
      }
      return true; // must return true if validation passes
    }),
  body("productOwnerID")
    .notEmpty()
    .withMessage("productOwnerID is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new BadRequestError("Invalid MongoDB id");
      }
      return true;
    }),
]);
export const validateIdParamAndBody = withValidationErrors([
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 4, max: 20 })
    .withMessage("title must be 20 characters long")
    .matches(spaceAndNumberAndLetters)
    .withMessage(
      "title must contain only letters, spaces, hyphens, or apostrophes"
    ),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .custom((value) => {
      if (isNaN(Number(value)) || Number(value) <= 0) {
        throw new Error("Price must be a positive number");
      }
      return true;
    }),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .custom((value) => {
      if (isNaN(Number(value)) || Number(value) <= 0) {
        throw new Error("Quantity must be a positive number");
      }
      return true; // must return true if validation passes
    }),
  param("productId").custom(async (value, { req }) => {
    // "productId" is our params name in route
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const product = await ProductModel.findById(value);
    if (!product) throw new NotFoundError(`no product with id : ${value}`);

    const isOwner =
      req.body.productOwnerId === product.productOwnerID.toString();
    if (!isOwner) throw new Error("not authorized to access this route");
  }),
]);
export const validateIdParam = withValidationErrors([
  param("productId").custom(async (value, { req }) => {
    // "productId" is our params name in route
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const product = await ProductModel.findById(value);
    if (!product) throw new NotFoundError(`no product with id : ${value}`);

    const isOwner =
      req.user._id.toString() === product.productOwnerID.toString();
    if (!isOwner) throw new Error("not authorized to access this route");
  }),
]);

export const validateQuery = withValidationErrors([
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("search")
    .optional()
    .notEmpty()
    .matches(spaceAndNumberAndLetters)
    .withMessage(
      "search must contain only letters, spaces, hyphens, or apostrophes"
    ),
  query("sort")
    .optional()
    .isIn(["ascending", "descending"])
    .withMessage("Sort must be either 'ascending' or 'descending'"),
]);
//cart.*  This path targets an array named cart . The * then indicates that the validation or sanitization rules should be applied to each individual element within the cart array.
export const validateOrder = withValidationErrors([
  body("userId").isMongoId().withMessage("Invalid user ID in order"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value }).lean();
      if (!user) throw new Error("please register first");
    }),
  body("totalItemInCart")
    .isInt({ min: 1 })
    .withMessage("totalItemInCart must be a positive integer"),
  body("country")
    .notEmpty()
    .withMessage("country is required")
    .matches(countryRegex)
    .withMessage(
      "country must contain only letters, spaces, hyphens, or apostrophes"
    ),
  body("totalOrderPrice")
    .notEmpty()
    .withMessage("totalOrderPrice is required")
    .custom((value) => {
      if (isNaN(Number(value)) || Number(value) <= 0) {
        throw new Error("totalOrderPrice must be a positive number");
      }
      return true;
    }),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(phoneRegex)
    .withMessage("Phone number must contain only digits (8 to 15 characters)"),
  body("paymentStatus")
    .optional()
    .isIn(["pending"])
    .withMessage("paymentStatus must be 'pending'. "),
  body("cart")
    .isArray({ min: 1 })
    .withMessage("Cart must have at least one item"),
  body("cart.*.productId")
    .isMongoId()
    .withMessage("Invalid product ID in cart"),
  body("cart.*.title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 4, max: 20 })
    .withMessage("title must be 20 characters long")
    .matches(spaceAndNumberAndLetters)
    .withMessage(
      "title must contain only letters, spaces, hyphens, or apostrophes"
    ),
  body("cart.*.productQuantityInCart")
    .isInt({ min: 1 })
    .withMessage("Product quantity must be at least 1"),
  body("cart.*.price")
    .isFloat({ min: 0.01 })
    .withMessage("Product price must be a positive number"),
  body("cart.*.productTotalPriceInCart")
    .isFloat({ min: 0.01 })
    .withMessage("Total price must be a positive number"),
  body("cart.*.image")
    .optional()
    .isString()
    .withMessage("Image must be a string"),
  body("cart.*.productOwnerId")
    .isMongoId()
    .withMessage("Invalid product owner ID"),
]);
