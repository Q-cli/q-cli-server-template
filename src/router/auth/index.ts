import Router from "@koa/router";
import authController from "../../controller/auth";
import { vertifyLogin } from "../../middleware/auth";

const authRouter = new Router();

authRouter.post("/login", vertifyLogin, authController.login);

authRouter.get("/logout", authController.logout);

export default authRouter;
