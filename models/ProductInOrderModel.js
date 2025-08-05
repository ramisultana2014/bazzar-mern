import mongoose from "mongoose";

const ProductInOrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderModel",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductModel",
    },
    userBuyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    productOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    title: { type: String },
    productQuantityInCart: { type: Number },
    price: { type: Number },
    productTotalPriceInCart: { type: Number },
    image: { type: String },
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
// These indexes will help MongoDB efficiently query by orderId and productId. Good for performance! ✅
ProductInOrderSchema.index({ orderId: 1 });
ProductInOrderSchema.index({ productId: 1 });
ProductInOrderSchema.index({ productOwnerId: 1 });
ProductInOrderSchema.index({ userBuyerId: 1 });

export default mongoose.model("ProductInOrderModel", ProductInOrderSchema);
//after creating order i wil put orderId in each ProductInOrder
// cart in redux just to use it in controller to create productInOrder documents
