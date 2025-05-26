import express from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { CategoryService } from "./category-service";
import logger from "../config/logger";
import { asyncHandlerWrapper } from "../common/utils/wrapper";

const categoryRouter = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

categoryRouter.post(
  "/",
  categoryValidator,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  asyncHandlerWrapper(categoryController.create),
);

export default categoryRouter;
