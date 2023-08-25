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

    ctx.status = 200;
    ctx.body = responseFormat(true, { _id: result.insertedId });
  }

  async getList(ctx: CTX, next: Next) {
    const params = ctx.request.query as User.Params;
    const result = await userService.getUserList(params);
    ctx.body = responseFormat(true, { list: result });
  }

  async deleteUserById(ctx: CTX, next: Next) {
    const result = await userService.deleteUserById(ctx.request.query);
    ctx.body = responseFormat(!!result.deletedCount, { data: result });
  }

  async updateUser(ctx: CTX, next: Next) {
    const result = await userService.updateUser(ctx.request.body as User.User);
    if (!(result.acknowledged && result.modifiedCount && result.matchedCount)) {
      const error = new Error(errorTypes.USER_UPDATE_FAILED);
      return ctx.app.emit("error", error, ctx);
    }
    ctx.body = responseFormat(true, { data: result });
  }
}

export default new UserController();
