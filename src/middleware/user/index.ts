import { Next } from "koa";
import errorTypes from "../../constants/error-types";
import { CTX } from "../../utils/interface";
import userService from "../../service/user";
import { md5password } from "../../utils/password-handle";

export async function vertifyUser(ctx: CTX<User.User>, next: Next) {
  const { name, password } = (ctx.request.body ?? {}) as User.User;

  if (!name || !password || name === "" || password === "") {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  const result = await userService.getUserByName(name);

  if (result?._id) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
}

export async function formatPassword(ctx: CTX, next: Next) {
  if ((ctx.request.body as User.User)?.password) {
    (ctx.request.body as User.User).password = md5password(
      (ctx.request.body as User.User).password
    );
  }
  await next();
}
