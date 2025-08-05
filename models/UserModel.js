import mongoose from "mongoose";
import validator from "validator";
import validate from "validate.js";
import { hashPassword } from "../utils/passwordUtils.js";
const nameRegex = /^[A-Za-z]+$/i;
const constraints = {
  presence: { allowEmpty: false },
  type: "string",
  format: {
    pattern: nameRegex,
    flags: "i",
  },
};
const phoneRegex =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const constraintsPhone = {
  presence: { allowEmpty: false },
  type: "string",
  format: {
    pattern: phoneRegex,
    flags: "i",
  },
};
const UserSchema = new mongoose.Schema(
  {
    name: {
      trim: true,
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return !validate.single(value, constraints);
        },
        message: (props) => `${props.value} is not a valid first name`,
      },
    },
    lastName: {
      trim: true,
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return !validate.single(value, constraints);
        },
        message: (props) => `${props.value} is not a valid last name`,
      },
    },
    country: String,
    phoneNumber: {
      trim: true,
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return !validate.single(value, constraintsPhone);
        },
        message: (props) => `${props.value} is not a valid phoneNumber`,
      },
    },
    email: {
      type: String,
      unique: true,
      required: [true, "A user must have a Email"],
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
      select: false, //hide it from the output(response )
    },

    passwordConfirm: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        // (this) only work on save  and create not with findbyidandupdate cuz mongoose dont keep current obj in memory, mean (this) wont work with update
        validator: function (value) {
          return value === this.password; //value represent the passwordConfirm the user wrote
        },
        message: "Passwords are not the same",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      unique: true,
    },
    storeProfilePicture: String,
    storeProfilePictureID: String,
    storeCoverPicture: String,
    storeCoverPictureID: String,
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virual below works
    toObject: { virtuals: true },
  }
);
UserSchema.pre("save", async function (next) {
  const user = this;
  //this point to current document = user , pre"save"" run when use user.save() in routers  patch or post, it work befor saving document to database and befor res.send
  if (!this.isModified("password")) return next();
  user.passwordConfirm = undefined;
  user.password = await hashPassword(user.password);

  next();
});
//UserSchema.virtual is useful if we are admin and want to see what each user have product
UserSchema.virtual("productsOwnedByUSer", {
  ref: "ProductModel",
  localField: "_id",
  foreignField: "productOwnerID",
  justOne: false,
  //foreignField the name of field in model ProductModel  // each document in  ProductModel have the id of the User who create it
  //so we go to ProductModel and gather all the comment that have the same productOwnerID, localField let us compare the localField _id in UserModel with the id stored in ProductModel as productOwnerID
  //then in controller when we UserModel.find().populate({path:"productsOwnedByUSer"})
});

UserSchema.virtual("allProductsSalesField", {
  ref: "ProductInOrderModel",
  localField: "_id",
  foreignField: "productOwnerId",
  justOne: false,
  //foreignField the name of field in model ProductInOrderModel.
  // each document in  ProductInOrderModel have the id of its owner
  //so we go to ProductInOrderModel and gather all the documents that have the same productOwnerId,
  //  localField let us compare the localField _id in UserModel with the id stored in ProductInOrderModel as productOwnerId
  //then in controller when we UserModel.find().populate({path:"allProductsSalesField"})
});
export default mongoose.model("UserModel", UserSchema);
