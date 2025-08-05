import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    email: String,
    totalItemInCart: Number,
    totalOrderPrice: Number,
    country: String,
    phoneNumber: String,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virual below works
    toObject: { virtuals: true },
  }
);
//UserSchema.virtual is useful if we are admin and want to see what each user have product
OrderSchema.virtual("productsInTheOrderField", {
  ref: "ProductInOrderModel",
  localField: "_id",
  foreignField: "orderId",
  justOne: false,
  //foreignField the name of field in model ProductInOrderModel  // each document in  ProductInOrderModel have the id of its Order
  //so we go to ProductInOrderModel and gather all the product that have the same orderId, localField let us compare the localField _id in OrderModel with the id stored in ProductInOrderModel as orderId
  //then in controller when we OrderModel.find().populate({path:"productsInTheOrderField"})
});
export default mongoose.model("OrderModel", OrderSchema);
//after creating order i wil put orderId in each ProductInOrder
