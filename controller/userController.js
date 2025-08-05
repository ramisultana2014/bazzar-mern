import UserModel from "../models/UserModel.js";
import cloudinary from "cloudinary";
import { StatusCodes } from "http-status-codes";
import sharp from "sharp";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../errors/customErrors.js";
import multer from "multer";
import ProductModel from "../models/ProductModel.js";
import OrderModel from "../models/OrderModel.js";
import ProductInOrderModel from "../models/ProductInOrderModel.js";
import mongoose from "mongoose";
import day from "dayjs";
// const upload = multer({
//   limits: { fileSize: 15000000 },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
//       return cb(new Error("please upload a valid image"));
//     }
//     cb(undefined, true);
//   },
// });
const upload = multer({
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB

  fileFilter(req, file, cb) {
    const isExtensionValid = file.originalname.match(/\.(jpg|jpeg|png|webp)$/i);
    const isMimeTypeValid = ["image/jpeg", "image/png", "image/webp"].includes(
      file.mimetype
    );

    if (!isExtensionValid || !isMimeTypeValid) {
      return cb(
        new Error("Please upload a valid image (.jpg, .jpeg, .png, .webp)")
      );
    }

    cb(null, true);
  },
});

export const uploadImage = upload.single("image");
export const uploadImageForStore = async (req, res) => {
  // body must contain userid,title,image
  // must be with protect route middleware
  //const buffer = Buffer.from(req.body.image, "base64");
  const buffer = req.file.buffer;
  const processedImage = await sharp(buffer)
    .rotate()
    .resize({ width: 250 })
    .toBuffer();

  // Upload the processed image to Cloudinary
  const uploadPromise = new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return reject(
            new InternalServerError("Upload failed. Please try again.")
          );
        }
        resolve(result);
      }
    );
    uploadStream.end(processedImage); // Pass the processed image to the stream
  });

  const response = await uploadPromise; // Wait for Cloudinary response
  //console.log(response.secure_url);
  //console.log(req.user.profilePictureID);
  if (req.user.storeProfilePictureID && req.body.storeProfilePicture) {
    await cloudinary.v2.uploader.destroy(req.user.storeProfilePictureID);
  }
  if (req.user.storeCoverPictureID && req.body.storeCoverPicture) {
    await cloudinary.v2.uploader.destroy(req.user.storeCoverPictureID);
  }
  if (req.body.storeCoverPicture) {
    req.user.storeCoverPicture = response.secure_url;
    req.user.storeCoverPictureID = response.public_id;
  }
  if (req.body.storeProfilePicture) {
    req.user.storeProfilePicture = response.secure_url;
    req.user.storeProfilePictureID = response.public_id;
  }
  // console.log(req.user);
  // console.log(req.body.storeProfilePicture);
  // console.log(req.body.storeCoverPicture);
  // console.log(req.user.storeProfilePicture);
  // console.log(req.user.storeCoverPicture);
  const user = await UserModel.findByIdAndUpdate(req.user._id, req.user, {
    new: true,
  });

  res.status(StatusCodes.OK).json({
    msg: "image successfully updated",
    data: { user },
  });
};
export const deleteStoreImage = async (req, res) => {
  if (req.user.storeProfilePictureID && req.body.storeProfilePicture) {
    await cloudinary.v2.uploader.destroy(req.user.storeProfilePictureID);
  }
  if (req.user.storeCoverPictureID && req.body.storeCoverPicture) {
    await cloudinary.v2.uploader.destroy(req.user.storeCoverPictureID);
  }
  if (req.body.storeCoverPicture) {
    req.user.storeCoverPicture = "";
    req.user.storeCoverPictureID = "";
  }
  if (req.body.storeProfilePicture) {
    req.user.storeProfilePicture = "";
    req.user.storeProfilePictureID = "";
  }
  // console.log(req.user);
  // console.log(req.body.storeProfilePicture);
  // console.log(req.body.storeCoverPicture);
  // console.log(req.user.storeProfilePicture);
  // console.log(req.user.storeCoverPicture);
  const user = await UserModel.findByIdAndUpdate(req.user._id, req.user, {
    new: true,
  });

  res.status(StatusCodes.OK).json({
    msg: "image successfully deleted",
    data: { user },
  });
};
export const uploadProduct = async (req, res) => {
  // body must contain productOwnerID,title,image ...
  // must be with protect route middleware
  if (req.body.productOwnerID !== req.user._id.toString()) {
    throw new BadRequestError("wrong credential");
  }
  try {
    const buffer = req.file.buffer;
    const processedImage = await sharp(buffer)
      .rotate()
      .resize({ width: 250 })
      .toBuffer();

    // Upload the processed image to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            return reject(
              new InternalServerError("Upload failed. Please try again.")
            );
          }
          resolve(result);
        }
      );
      uploadStream.end(processedImage); // Pass the processed image to the stream
    });

    const response = await uploadPromise; // Wait for Cloudinary response
    //console.log(response.secure_url);

    const productObj = {
      title: req.body.title,
      price: Number(req.body.price),
      description: req.body.description,
      quantity: Number(req.body.quantity),
      productImageID: response.public_id,
      productImage: response.secure_url,
      category: req.body.category,
      productOwnerID: req.user._id,
      storeName: req.body.storeName,
    };
    await ProductModel.create(productObj);

    res.status(StatusCodes.OK).json({
      msg: "post created successfully",
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
export const getAllUserProducts = async (req, res) => {
  const products = await ProductModel.find({
    productOwnerID: req.user._id,
  }).sort({
    createdAt: -1,
  });
  // NotFoundError for 404
  //console.log(posts);
  if (products.length === 0)
    throw new NotFoundError("there is no products to display");
  //posts=posts.sort({createdAt:-1})
  res.status(StatusCodes.OK).json({
    msg: "success",
    data: { products },
    //products is an array contain many document of ProductModel
  });
};
export const updateUserProduct = async (req, res) => {
  const { productId } = req.params;
  const updatedFields = req.body;

  // Make sure we're not allowing changes to owner ID
  if ("productOwnerID" in updatedFields) {
    delete updatedFields.productOwnerID;
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    updatedFields,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new NotFoundError(`No product found with ID: ${productId}`);
  }

  res.status(200).json({
    msg: "Product updated successfully",
  });
};
export const deleteUserProduct = async (req, res) => {
  //console.log(req.user, req.params.id);
  const deletedPost = await ProductModel.findOneAndDelete({
    _id: req.params.productId,
    productOwnerID: req.user._id,
  });
  //console.log(deletedPost);
  if (!deletedPost) throw new NotFoundError("no post to delete");
  if (deletedPost.productImageID) {
    await cloudinary.v2.uploader.destroy(deletedPost.productImageID);
  }
  res.status(StatusCodes.OK).json({
    msg: "post deleted successfully",
  });
};

export const hubProducts = async (req, res) => {
  //general url: http://localhost:5100/api/v1/product/allproducts?search=healthCare&sort=ascending&fields=name,duration,difficulty
  //in my url i will not use fields, just page, sort, and   search,
  //my url at first /hubProducts?
  //later: /hubProducts?search=what user write
  //full url: /hubProducts?search=gold&price=descending&page=2
  //we just using price for sort so the sort in url is either sort=ascending or sort=descending
  //console.log(req.user);
  //console.log(req.query);

  //if the url contain page= , sort= , limit= , fields= we will delete theme,  any value inside url like search or title its not a fields and bring documents according to search or what ever written in url except excludedFields
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);
  //now queryObj is just object look like queryObj={
  //search=healthCare
  //}
  // let query = ProductModel.find({
  //   ...queryObj,
  //   productOwnerID: { $ne: req.user._id },
  // });
  const basics = {
    productOwnerID: { $ne: req.user._id },
  };
  // (if) is useful because user may not use the search bar, if he used will have req.query.search thats the name for the query coming from search bar
  if (req.query.search && typeof req.query.search === "string") {
    const regex = { $regex: req.query.search, $options: "i" };
    basics.$or = [{ category: regex }, { title: regex }, { storeName: regex }];
    // now for the same word coming from front(req.query.category)  from the search bar will search in both fields title, category,storeName
  }

  let query = ProductModel.find(basics);
  // Sorting
  if (req.query.sort) {
    query =
      req.query.sort === "ascending"
        ? query.sort("price")
        : query.sort("-price");
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  //skip number of result to skip in order to reach our page
  // if we had 100 docs and  limit =10 (10 result in each page)so if we want page 3 so we need to skip 20 result
  const page = Number(req.query.page) || 1;
  const limit = 8;
  const skip = (page - 1) * limit;

  // Get total number of matching products (before applying skip/limit)
  const totalItems = await ProductModel.countDocuments(basics);
  if (totalItems === 0) {
    throw new NotFoundError("No products found for the specified category");
  }
  const totalPages = Math.ceil(totalItems / limit);

  if (page > totalPages) {
    throw new NotFoundError(
      `Page ${page} does not exist. Total pages: ${totalPages}`
    );
    // if page 10 and total pages 5 will throw error
  }
  // Apply pagination
  query = query.skip(skip).limit(limit);
  // for default behavior query=query.skip(0).limit(10). it bring  up to 10 document ( limit 10) ,and that is page 1.
  // for page= 2 ,query=query.skip(10).limit(10), it will skip first 10 document , and bring back what after those skipped 10 document up to 10 document(limit)

  // Execute query
  const hubProducts = await query;

  // If no results found

  if (hubProducts.length === 0)
    throw new NotFoundError("there is no products to display");

  // Send response with metadata
  return res.status(StatusCodes.OK).json({
    page, //current page  or the default 1
    totalPages,
    totalItems, //total number of documents that match the filter
    hubProducts, //data
    count: hubProducts.length, //This is how many products were actually returned on this specific page
  });
};
// for first request coming from front end the response is
//page:1
// totalPages: that will determain the number of button in pagination in front end

// export const createOrder = async (req, res) => {
//   try {
//     req.body.order.cart.map(async (product) => {
//       await ProductModel.findById(product.productId);
//       if (!product) throw new BadRequestError("nn product found ");
//     });
//     await OrderModel.deleteMany({
//       paymentStatus: "pending",
//     });
//     const order = await OrderModel.create({ ...req.body.order });
//     const orderId = order._id;
//     req.body.order.cart.forEach(async (productInCart) => {
//       const product = await ProductModel.findById(productInCart.productId);
//       product.quantity -= productInCart.productQuantityInCart;
//       await product.save();
//       await ProductInOrderModel.create({
//         ...productInCart,
//         orderId,
//       });
//     });
//     res.status(StatusCodes.OK).json({
//       msg: "order created successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     throw new InternalServerError("Something went wrong, please try again");
//   }
// };
export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    // Start the transaction
    session.startTransaction();

    // Remove any previous pending orders,
    await OrderModel.deleteMany({
      paymentStatus: "pending",
      userId: req.body.userId,
    }).session(session);
    await ProductInOrderModel.deleteMany({
      paymentStatus: "pending",
      userBuyerId: req.body.userId,
    }).session(session);

    //step 0 Prevent duplicate products in cart
    // If you're not already checking this on the frontend, server-side protection like this might help:
    const uniqueProductIds = new Set(
      req.body.cart.map((item) => item.productId)
    );
    if (uniqueProductIds.size !== req.body.cart.length) {
      throw new BadRequestError("Duplicate products in cart are not allowed.");
    }

    // Step 1: Validate all products exist and have enough quantity
    let calculatedTotalOrderPrice = 0;
    for (const item of req.body.cart) {
      const product = await ProductModel.findById(item.productId)
        .session(session)
        .lean();
      //lean() return the raw document without save() ,isModified() ... , its really fast and good for comparison , it just return the document without the ability to modify it
      if (!product) throw new BadRequestError("Product not found");

      if (product.quantity < item.productQuantityInCart) {
        throw new BadRequestError(
          `Not enough quantity for product: ${product.title}`
        );
      }
      calculatedTotalOrderPrice += item.productQuantityInCart * product.price;
    }
    if (calculatedTotalOrderPrice !== req.body.totalOrderPrice)
      throw new BadRequestError(
        "Price mismatch — please refresh and try again."
      );
    // Step 2: Create the order
    const order = await OrderModel.create([req.body], { session });
    const orderId = order[0]._id;

    // Step 3: Loop over cart, update quantity, create ProductInOrder
    for (const item of req.body.cart) {
      // const product = await ProductModel.findById(item.productId).session(
      //   session
      // );

      // product.quantity -= item.productQuantityInCart;
      // await product.save({ session });

      await ProductInOrderModel.create(
        [
          {
            ...item,
            orderId,
          },
        ],
        { session }
      );
    }

    // Step 4: Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(StatusCodes.OK).json({
      msg: "Order created successfully",
      orderId,
    });
  } catch (error) {
    // If anything goes wrong, rollback changes
    await session.abortTransaction();
    session.endSession();

    console.log("Transaction Error:", error);
    throw new InternalServerError("Something went wrong, please try again");
  }
};

export const statsController = async (req, res) => {
  // $match will bring all document  that createdBy a user and since in the model ProductInOrderModel the productOwnerId is obj we need to read it like this
  const totalProductQuantity = await ProductInOrderModel.aggregate([
    {
      $match: {
        productOwnerId: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    // $group will put them into group according to title and count them by $sum
    //here the _id belong to $group
    {
      $group: {
        _id: "$title",
        totalQuantity: { $sum: "$productQuantityInCart" },
      },
    },
    { $sort: { totalQuantity: -1 } },
    //now will have array [{_id:table,totalQuantity:2},{_id:salon,totalQuantity:6}]
    //in project we rename _id and keep filed count then with _id:0 we hide the field _id ,so we don't have tow field _id and productOrdering have same value
    {
      $project: {
        product: "$_id",
        totalQuantity: 1,
        _id: 0,
      },
    },
    //it becomes [{product:table,totalQuantity:2},{product:salon,totalQuantity:6}]
  ]);

  // $match will bring all document  that createdBy a user and since in the model ProductInOrderModel the productOwnerId is obj we need to read it like this
  const topSellingProducts = await ProductInOrderModel.aggregate([
    {
      $match: {
        productOwnerId: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    // $group will put them into group according to title and count them by $sum
    //here the _id belong to $group
    {
      $group: {
        _id: "$title",
        totalSells: { $sum: "$productTotalPriceInCart" },
      },
    },
    { $sort: { totalSells: -1 } },
    //now will have array [{_id:table,totalSells:2},{_id:salon,totalSells:6}]
    //in project we rename _id and keep filed count then with _id:0 we hide the field _id ,so we don't have tow field _id and productOrdering have same value
    {
      $project: {
        product: "$_id",
        totalSells: 1,
        _id: 0,
      },
    },
    //it becomes [{product:table,totalSells:2},{totalSells:salon,totalSells:6}]
  ]);
  let monthlyProductOrdering = await ProductInOrderModel.aggregate([
    { $match: { productOwnerId: new mongoose.Types.ObjectId(req.user._id) } },
    {
      $group: {
        // when we want to group document according to month we alos need to group them to year cuz a month must belong to year
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: "$productQuantityInCart" },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 }, // here for 6 month
  ]);
  // console.log(monthlyProductOrdering);
  // [
  //      { _id: { year: 2024, month: 9 }, count: 8 },
  //      { _id: { year: 2024, month: 8 }, count: 8 },
  //      { _id: { year: 2024, month: 7 }, count: 12 },
  //      { _id: { year: 2024, month: 6 }, count: 7 },
  //      { _id: { year: 2024, month: 5 }, count: 11 },
  //      { _id: { year: 2024, month: 4 }, count: 10 }
  //    ]
  monthlyProductOrdering = monthlyProductOrdering
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();
  //console.log(monthlyApplications);
  // [
  //      { date: 'Sep 24', count: 8 },
  //      { date: 'Aug 24', count: 8 },
  //      { date: 'Jul 24', count: 12 },
  //      { date: 'Jun 24', count: 7 },
  //      { date: 'May 24', count: 11 },
  //     { date: 'Apr 24', count: 10 }
  //    ]

  res
    .status(StatusCodes.OK)
    .json({ topSellingProducts, monthlyProductOrdering, totalProductQuantity });
};
