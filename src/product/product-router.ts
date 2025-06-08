import express from "express";
import { asyncHandlerWrapper } from "../common/utils/wrapper";
import { canAccess } from "../common/middlewares/canAccess";
import { Roles } from "../common/constants";
import authenticate from "../common/middlewares/authenticate";
import { ProductController } from "./product-controller";
import productValidator from "./product-validator";

const productsRouter = express.Router();

const productController = new ProductController();
productsRouter.post(
  "/",
  authenticate,
  canAccess([Roles.ADMIN, Roles.MANAGER]),
  productValidator,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  asyncHandlerWrapper(productController.create),
);

export default productsRouter;
