import { Next } from "koa";
import errorTypes from "../../constants/error-types";
import userService from "../../service/user";
import { CTX } from "../../utils/interface";
import { md5password } from "../../utils/password-handle";

export async function vertifyLogin(ctx: CTX, next: Next) {
  const { name, password } = (ctx.request.body ?? {}) as User.User;

  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  const user = await userService.getUserByName(name);

  if (!user) {
    const error = new Error(errorTypes.USER_NOT_FOUND);
    return ctx.app.emit("error", error, ctx);
  }

  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.INVALID_PASSWORD);
    return ctx.app.emit("error", error, ctx);
  }

  // @ts-ignore
  ctx.request.user = user;

  await next();
}
