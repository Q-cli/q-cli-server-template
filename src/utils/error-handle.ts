import { responseFormat } from ".";
import errorTypes from "../constants/error-types";
import { CTX } from "./interface";

export default function errorHandle(error: Error, ctx: CTX<any>) {
  let status, message;

  console.log();
  console.log("errorHandle", error.message);
  console.log();

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "Name or password is required";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 400;
      message = "User already exists";
      break;
    case errorTypes.USER_NOT_FOUND:
      status = 400;
      message = "User not found";
      break;
    case errorTypes.INVALID_PASSWORD:
      status = 400;
      message = "Invalid password";
      break;
    case errorTypes.UN_AUTHORIZATION:
      status = 400;
      message = "User is not authorized";
      break;
    case errorTypes.USER_CREATE_FAILED:
      status = 400;
      message = errorTypes.USER_CREATE_FAILED;
      break;
    default:
      status = 404;
      message = "Not Found";
      break;
  }

  ctx.status = status;
  ctx.body = responseFormat(false, message);
}
