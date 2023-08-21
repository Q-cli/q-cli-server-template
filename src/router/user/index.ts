import Router from "@koa/router";
import userController from "../../controller/user";
import { formatPassword, vertifyUser } from "../../middleware/user";

const userRoter = new Router({ prefix: "/users" });

userRoter.post("/", vertifyUser, formatPassword, userController.create);

export default userRoter;
