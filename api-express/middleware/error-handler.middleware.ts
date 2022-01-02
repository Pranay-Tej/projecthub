import { NextFunction, Request, Response } from "express";
import CustomApiError from "../errors/custom-api.error";
import StatusCodes from "../types/status-codes";

const errorHandlerMiddleware = (
  err: CustomApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error middleware....");

  console.error(err);
  const customError = {
    // set default
    statusCode: err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err?.message || "Internal Server Error",
    name: err?.name || "Internal Server Error",
  };

  return res.status(customError.statusCode).json(customError).end();
};

export default errorHandlerMiddleware;
