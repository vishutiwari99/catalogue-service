import express, { NextFunction, Request, Response } from "express";
import logger from "./config/logger";
import { HttpError } from "http-errors";
import categoryRouter from "./category/category-router";

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    errors: [
      {
        type: err.name,
        msg: err.message,
        path: "",
        location: "",
      },
    ],
  });
});

export default app;
