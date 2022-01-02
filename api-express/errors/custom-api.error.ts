import StatusCodes from "../types/status-codes";

export default class CustomApiError extends Error {
  statusCode?: number = StatusCodes.INTERNAL_SERVER_ERROR;
  constructor(message: string = "Internal Server Error") {
    super(message);
    this.name = this.constructor.name;
  }
}
