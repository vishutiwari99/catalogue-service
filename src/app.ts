import express, { NextFunction } from "express";
import categoryRouter from "./category/category-router";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";

const app = express();
app.use(express.json());
app.get("/", (req, res, next: NextFunction) => {
  res.json({
    message: "Hello from Catalogue Service!",
  });
  next();
});

app.use("/categories", categoryRouter);

// global error handler

app.use(globalErrorHandler);

export default app;
