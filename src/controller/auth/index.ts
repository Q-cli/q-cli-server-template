import { Next } from "koa";
import { CTX } from "../../utils/interface";
import { formatToken, generateToken, responseFormat } from "../../utils";
import errorTypes from "../../constants/error-types";
import CommonService from "../../service/common";

class AuthController {
  async login(ctx: CTX, next: Next) {
    // @ts-ignore
    const user = ctx.user as User.User;

    const token = generateToken(user);

    // 设置cookie
    ctx.cookies.set("token", token, {
      expires: new Date(formatToken(token).exp! * 1000),
      path: "/",
      // 其他可选参数，如domain、secure、httpOnly等
    });

    ctx.body = responseFormat(true, { user });
  }

  async logout(ctx: CTX, next: Next) {
    const token = ctx.cookies.get("token");

    if (!token) {
      const error = new Error(errorTypes.UN_AUTHORIZATION);
      return ctx.app.emit("error", error);
    }

    const result = await CommonService.setExpireToken(token);

    ctx.body = responseFormat(!!result.insertedId);
  }
}

const authController = new AuthController();

export default authController;
