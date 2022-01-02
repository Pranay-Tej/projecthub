import StatusCodes from "../types/status-codes";
import CustomApiError from "./custom-api.error";

export default class UnauthenticatedError extends CustomApiError {
  constructor(message: string = "Invalid credentials") {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
