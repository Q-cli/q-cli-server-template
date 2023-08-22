import { CTX, Response } from "./interface";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { Next } from "koa";
import errorTypes from "../constants/error-types";
import whitePath from "../constants/white-path";
import dayjs from 'dayjs';

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
  path.resolve(process.cwd(), "./private.key"),
  "utf-8"
);

export function generateToken(user: User.User) {
  return jwt.sign(user, PrivateKey, {
    expiresIn: 24 * 60 * 60,
    algorithm: "RS256",
  });
}

const PublicKey = fs.readFileSync(
  path.resolve(process.cwd(), "./public.key"),
  "utf-8"
);

export async function vertifyAuth(ctx: CTX, next: Next) {
  const token = ctx.cookies.get("token");
  const url = ctx.request.url;

  try {
    if (!whitePath.find((path) => path.includes(url))) {
      if (!token) {
        throw new Error(errorTypes.UN_AUTHORIZATION);
      }
      const user = jwt.verify(token, PublicKey, { algorithms: ["RS256"] });
      ctx.user = user;
    }
    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
}

export async function logRequestInfoMiddleware(ctx:CTX, next: Next) {
  console.log(
    `${dayjs().format("YYYY-MM-DD HH:mm:ss")} ${ctx.request.url} ${
      ctx.user?.name ?? ""
    }`
  );
  await next();
}
