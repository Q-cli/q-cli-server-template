import { CTX, Response } from "./interface";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { Next } from "koa";
import errorTypes from "../constants/error-types";

export function responseFormat(
  success: boolean,
  result: { [key: string]: any } | string
): Response {
  const res: Response = {
    code: success ? 1 : 0,
    success,
    message:
      result && typeof result === "string"
        ? result
        : success
        ? "操作成功"
        : "操作失败",
  };

  if (typeof result !== "string") {
    return {
      ...res,
      ...result,
    };
  }

  return res;
}

const PrivateKey = fs.readFileSync(
  path.resolve(__dirname, "../../private.key"),
  "utf-8"
);

export function generateToken(user: User.User) {
  return jwt.sign(user, PrivateKey, {
    expiresIn: 24 * 60 * 60,
    algorithm: "RS256",
  });
}

const PublicKey = fs.readFileSync(
  path.resolve(__dirname, "../../public.key"),
  "utf-8"
);

export function vertifyAuth(ctx: CTX, next: Next) {
  const token = ctx.request.headers.authorization;
  try {
    if (!token) {
      throw new Error(errorTypes.UN_AUTHORIZATION);
    }
    console.log("vertifyAuth", token);
    console.log("PublicKey", PublicKey);
    const user = jwt.verify(token, PublicKey, { algorithms: ["RS256"] });
    console.log("user", user);
    ctx.user = user;
    next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
}
