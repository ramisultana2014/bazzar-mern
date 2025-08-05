import mongoose from "mongoose";
// each product have the id if user how create it
const ProductSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    quantity: Number,
    productImage: String,
    productImageID: String,
    category: String,
    storeName: String,
    productOwnerID: { type: mongoose.Schema.ObjectId, ref: "UserModel" },
  },
  {
    timestamps: true, //that will add tow( fields created at update at)
    toJSON: { virtuals: true }, // to make virual below works
    toObject: { virtuals: true },
  }
);
// ProductSchema.pre(/^find/, function (next) {
//   this.populate({ path: "productOwnerID", select: "email phoneNumber" });
//   next();
// });
ProductSchema.virtual("singleProductSalesField", {
  ref: "ProductInOrderModel",
  localField: "_id",
  foreignField: "productId",
  justOne: false,
  //foreignField the name of field in model ProductInOrderModel.
  // each document in  ProductInOrderModel have the id of product
  //so we go to ProductInOrderModel and gather all the documents that have the same productId,
  //  localField let us compare the localField _id in ProductModel with the id stored in ProductInOrderModel as productId
  //then in controller when we ProductModel.find().populate({path:"singleProductSalesField"})
});

ProductSchema.index({ title: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ storeName: 1 });

export default mongoose.model("ProductModel", ProductSchema);
