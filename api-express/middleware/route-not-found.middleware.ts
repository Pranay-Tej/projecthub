import { NextFunction, Request, Response } from "express";
import CustomErrors from "../errors";
import StatusCodes from "../types/status-codes";

const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new CustomErrors.NotFoundError("Route"));
};

export default notFoundMiddleware;
