import { Next } from "koa";
import { CTX } from "../utils/interface";
import whitePath from "../constants/white-path";
import errorTypes from "../constants/error-types";
import { formatToken } from "../utils";
import logger from "../utils/logger";
import CommonService from "../service/common";

export async function vertifyAuth(ctx: CTX, next: Next) {
  const token = ctx.cookies.get("token");
  const url = ctx.request.url;

  try {
    if (
      !whitePath.find((path) => path.includes(url)) ||
      url.includes("/login")
    ) {
      if (!token && !url.includes("/login")) {
        throw new Error(errorTypes.UN_AUTHORIZATION);
      }
      if (token) {
        const isExpireToken = await CommonService.getExpireToken(token);
        if (isExpireToken) {
          ctx.cookies.set("token", null, { expires: new Date(0), path: "/" });
          throw new Error(errorTypes.UN_AUTHORIZATION);
        }
        const user = formatToken(token);
        ctx.user = user;
      }
    }
    await next();
  } catch (error: any) {
    if (!url.includes("/login")) {
      ctx.app.emit("error", error, ctx);
    } else {
      await next();
    }
  }
}

export async function logRequestInfoMiddleware(ctx: CTX, next: Next) {
  logger.info(
    `${ctx.request.method} ${ctx.request.path} ${ctx.user?._id ?? ""} ${
      ctx.user?.username ?? ""
    } ${JSON.stringify(ctx.request.query, undefined)} ${JSON.stringify(
      ctx.request.body,
      undefined
    )}`
  );
  await next();
}
