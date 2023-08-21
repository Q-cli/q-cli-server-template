import Router from "@koa/router";
import authController from "../../controller/auth";
import { vertifyLogin } from "../../middleware/auth";
import { responseFormat, vertifyAuth } from "../../utils";

const authRouter = new Router();

authRouter.post("/login", vertifyLogin, authController.login);
authRouter.get("/test_token", vertifyAuth, (ctx) => {
  ctx.body = responseFormat(true, "测试成功");
});

export default authRouter;
