import { Router } from "express";
import { protectedRouterInServer } from "../controller/authController.js";
import {
  createOrder,
  deleteStoreImage,
  deleteUserProduct,
  getAllUserProducts,
  hubProducts,
  statsController,
  updateUserProduct,
  uploadImage,
  uploadImageForStore,
  uploadProduct,
} from "../controller/userController.js";
import {
  validateIdParam,
  validateIdParamAndBody,
  validateQuery,
  validateUploadProduct,
} from "../middleware/validationMiddleware.js";
const router = Router();
router.use(protectedRouterInServer);
router.post("/uploadImageForStore", uploadImage, uploadImageForStore);
router.post("/deleteStoreImage", deleteStoreImage);
router.post(
  "/uploadProduct",
  uploadImage,
  validateUploadProduct,
  uploadProduct
);
router.get("/userProducts", getAllUserProducts);
router.get("/stats", statsController);
router.get("/hubProducts", validateQuery, hubProducts);
router.post("/createOrder", createOrder);
router
  .route("/userProduct/:productId")
  .patch(validateIdParamAndBody, updateUserProduct)
  .delete(validateIdParam, deleteUserProduct);
export default router;
