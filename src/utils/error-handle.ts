import { responseFormat } from ".";
import errorTypes from "../constants/error-types";
import { CTX } from "./interface";
import logger from './logger';

export default function errorHandle(error: Error, ctx: CTX<any>) {
  let status = 200,
    message;

  logger.error(error.message);

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      message = "Username or password is required";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      message = "User already exists";
      break;
    case errorTypes.USER_NOT_FOUND:
      message = "User not found";
      break;
    case errorTypes.INVALID_PASSWORD:
      message = "Invalid password";
      break;
    case errorTypes.UN_AUTHORIZATION:
      status = 401;
      message = "User is not authorized";
      break;
    case errorTypes.USER_CREATE_FAILED:
      message = errorTypes.USER_CREATE_FAILED;
      break;
    case errorTypes.USER_UPDATE_FAILED:
      message = errorTypes.USER_UPDATE_FAILED;
      break;
    default:
      status = 404;
      message = "Not Found";
      break;
  }

  ctx.status = status;
  ctx.body = responseFormat(false, message);
}
