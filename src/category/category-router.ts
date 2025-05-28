import express from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { CategoryService } from "./category-service";
import logger from "../config/logger";
import { asyncHandlerWrapper } from "../common/utils/wrapper";
import { canAccess } from "../common/middlewares/canAccess";
import { Roles } from "../common/constants";
import authenticate from "../common/middlewares/authenticate";

const categoryRouter = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

categoryRouter.post(
  "/",
  authenticate,
  canAccess([Roles.ADMIN]),
  categoryValidator,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  asyncHandlerWrapper(categoryController.create),
);

export default categoryRouter;
