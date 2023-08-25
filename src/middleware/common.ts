import { Next } from "koa";
import { CTX } from "../utils/interface";
import whitePath from "../constants/white-path";
import errorTypes from "../constants/error-types";
import { formatToken } from "../utils";
import dayjs from 'dayjs';

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
  console.log(
    `${dayjs().format("YYYY-MM-DD HH:mm:ss")} ${ctx.request.method} ${ctx.request.path} (${
      ctx.user?._id ?? ""
    })${ctx.user?.username ?? ""}`
  );
  await next();
}
