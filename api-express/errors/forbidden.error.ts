import StatusCodes from "../types/status-codes";
import CustomApiError from "./custom-api.error";

export default class ForbiddenError extends CustomApiError {
  constructor(message: string = "Forbidden access") {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
