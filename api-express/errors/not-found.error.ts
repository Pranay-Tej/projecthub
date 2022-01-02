import StatusCodes from "../types/status-codes";
import CustomApiError from "./custom-api.error";

export default class NotFoundError extends CustomApiError {
  constructor(entity: string = "Entity") {
    super(`${entity} not found`);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
