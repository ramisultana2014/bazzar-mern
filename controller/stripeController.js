import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../errors/customErrors.js";
import OrderModel from "../models/OrderModel.js";
import ProductInOrderModel from "../models/ProductInOrderModel.js";
import ProductModel from "../models/ProductModel.js";
import mongoose from "mongoose";
export const createCheckoutSession = async (req, res) => {
  const origin = req.get("origin");
  //console.log("origin", origin);
  const orderId = req.params.orderId;

  const order = await OrderModel.findById(orderId).populate({
    path: "productsInTheOrderField",
  });

  if (!order) throw new NotFoundError("please provide valid order");
  const { productsInTheOrderField } = order;
  //console.log(productsInTheOrderField);
  const line_items = productsInTheOrderField.map((item) => {
    return {
      quantity: item.productQuantityInCart,
      price_data: {
        currency: "usd",

        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
    };
  });
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { orderId },
      line_items,
      mode: "payment",
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
    });
    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    // console.log(error);
    throw new BadRequestError("stripe error");
  }
};

// export const sessionStatus = async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//   const orderId = session.metadata?.orderId;
//   const createdAt = session.created * 1000; // Stripe timestamps are in seconds
//   const now = Date.now();
//   const twentyMinutes = 20 * 60 * 1000;
//   if (session.status === "complete" && orderId) {
//     await OrderModel.findByIdAndUpdate(
//       orderId,
//       { paymentStatus: "paid" },
//       { runValidators: true }
//     );
//     await ProductInOrderModel.updateMany(
//       { orderId },
//       { paymentStatus: "paid" },
//       { runValidators: true }
//     );
//     const orderItems = await ProductInOrderModel.find({ orderId });
//     for (const item of orderItems) {
//       await ProductModel.findByIdAndUpdate(item.productId, {
//         $inc: { quantity: -item.productQuantityInCart },
//       });
//     }

//     // 🧠 Handle expired or canceled sessions
//     // if (session.status === "expired" && orderId)
//     if (
//       now - createdAt > twentyMinutes &&
//       session.status !== "complete" &&
//       orderId
//     ) {
//       // 1. Get all product-in-order items
//       const orderItems = await ProductInOrderModel.find({ orderId });

//       for (const item of orderItems) {
//         // 2. Restore stock in actual product
//         await ProductModel.findByIdAndUpdate(item.productId, {
//           $inc: { quantity: item.productQuantityInCart },
//         });
//       }

//       // 3. Delete order items
//       await ProductInOrderModel.deleteMany({ orderId });

//       // 4. Delete the abandoned order
//       await OrderModel.findByIdAndDelete(orderId);
//     }

//     res.send({
//       status: session.status,
//       customer_email: session.customer_details?.email,
//     });
//   }
// };

export const sessionStatus = async (req, res) => {
  const mongooseSession = await mongoose.startSession();
  try {
    mongooseSession.startTransaction();
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    const orderId = session.metadata?.orderId;
    const createdAt = session.created * 1000; // Stripe timestamps are in seconds
    const now = Date.now();
    const twentyMinutes = 20 * 60 * 1000;
    if (session.status === "complete" && orderId) {
      await OrderModel.findByIdAndUpdate(
        orderId,
        { paymentStatus: "paid" },
        { runValidators: true }
      ).session(mongooseSession);
      await ProductInOrderModel.updateMany(
        { orderId },
        { paymentStatus: "paid" },
        { runValidators: true }
      ).session(mongooseSession);
      const orderItems = await ProductInOrderModel.find({ orderId }).session(
        mongooseSession
      );
      for (const item of orderItems) {
        await ProductModel.findByIdAndUpdate(item.productId, {
          $inc: { quantity: -item.productQuantityInCart },
        }).session(mongooseSession);
      }

      // 🧠 Handle expired or canceled sessions
      // if (session.status === "expired" && orderId)
      if (
        now - createdAt > twentyMinutes &&
        session.status !== "complete" &&
        orderId
      ) {
        // 1. Get all product-in-order items
        const orderItems = await ProductInOrderModel.find({ orderId }).session(
          mongooseSession
        );

        for (const item of orderItems) {
          // 2. Restore stock in actual product
          await ProductModel.findByIdAndUpdate(item.productId, {
            $inc: { quantity: item.productQuantityInCart },
          }).session(mongooseSession);
        }

        // 3. Delete order items
        await ProductInOrderModel.deleteMany({ orderId }).session(
          mongooseSession
        );

        // 4. Delete the abandoned order
        await OrderModel.findByIdAndDelete(orderId).session(mongooseSession);
      }
      // Step 4: Commit transaction
      await mongooseSession.commitTransaction();
      mongooseSession.endSession();
      res.send({
        status: session.status,
        customer_email: session.customer_details?.email,
      });
    }
  } catch (error) {
    await mongooseSession.abortTransaction();
    mongooseSession.endSession();

    console.log("Transaction Error:", error);
    throw new InternalServerError("Something went wrong, please try again");
  }
};
