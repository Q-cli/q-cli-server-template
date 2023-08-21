import errorTypes from "../../constants/error-types";
import userService from "../../service/user";
import { responseFormat } from "../../utils";
import { CTX } from "../../utils/interface";
import { Next } from "koa";

export class UserController {
  async create(ctx: CTX, next: Next) {
    const user = ctx.request.body as User.User;

    const result = await userService.create(user);
    if (!result.acknowledged) {
      const error = new Error(errorTypes.USER_CREATE_FAILED);
      return ctx.app.emit("error", error, ctx);
    }
    console.log(
      "user create",
      result,
      responseFormat(true, { _id: result.insertedId })
    );
    ctx.body = responseFormat(true, { _id: result.insertedId });
  }
}

export default new UserController();
