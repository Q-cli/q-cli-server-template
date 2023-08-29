import Router from "@koa/router";
import { vertifyUser } from "../../middleware/user";
import { CTX } from "../../utils/interface";
import { Next } from "koa";
import { responseFormat } from "../../utils";

const commonRouter = new Router();

commonRouter.get("/currentUser", async (ctx: CTX, next: Next) => {
  ctx.body = responseFormat(true, { user: { ...ctx.user, iat: undefined, exp: undefined } });
});

export default commonRouter;
