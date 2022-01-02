import StatusCodes from "../types/status-codes";
import CustomApiError from "./custom-api.error";

export default class BadRequestError extends CustomApiError {
  constructor(message: string = "Bad Request") {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
