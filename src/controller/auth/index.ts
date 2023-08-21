import { Next } from "koa";
import { CTX } from "../../utils/interface";
import { generateToken, responseFormat } from "../../utils";

class AuthController {
  async login(ctx: CTX, next: Next) {
    // @ts-ignore
    const user = ctx.request.user as User.User;

    const token = generateToken(user);

    ctx.body = responseFormat(true, { user, token });
  }
}

const authController = new AuthController();

export default authController;
