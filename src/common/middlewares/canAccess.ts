import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { AuthRequest } from "../types";

export const canAccess = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const _req = req as AuthRequest;

    if (!_req.auth || !_req.auth.role) {
      const error = createHttpError(401, "Authentication data is missing");
      return next(error);
    }
    const roleFromToken = _req.auth.role;

    if (!roles.includes(roleFromToken)) {
      const error = createHttpError(
        403,
        "You are not authorized to access this resource",
      );
      next(error);
      return;
    }
    next();
  };
};
