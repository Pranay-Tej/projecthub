import NotFoundError from "./not-found.error";
import CustomApiError from "./custom-api.error";
import BadRequestError from "./bad-request.error";
import UnauthenticatedError from "./unathenticated.error";
import ForbiddenError from "./forbidden.error";

const CustomErrors = {
  NotFoundError,
  CustomApiError,
  BadRequestError,
  UnauthenticatedError,
  ForbiddenError,
};

export default CustomErrors;
