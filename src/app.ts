import express, { NextFunction } from "express";
import categoryRouter from "./category/category-router";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import cookieParser from "cookie-parser";
import productsRouter from "./product/product-router";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res, next: NextFunction) => {
  res.json({
    message: "Hello from Catalogue Service!",
  });
  next();
});

app.use("/categories", categoryRouter);
app.use("/products", productsRouter);

// global error handler

app.use(globalErrorHandler);

export default app;
