import Router from "@koa/router";
import userController from "../../controller/user";
import { formatPassword, vertifyUser } from "../../middleware/user";

const userRouter = new Router({ prefix: "/user" });

/**
 * @description: 添加用户
 */
userRouter.put("/", vertifyUser, formatPassword, userController.create);

/**
 * @description: 查询用户列表
 */
userRouter.get("/", userController.getList);

/**
 * @description: 根据ID删除用户
 */
userRouter.delete("/", userController.deleteUserById);

/**
 * @description: 修改用户
 */
userRouter.post("/", formatPassword, userController.updateUser);

export default userRouter;
