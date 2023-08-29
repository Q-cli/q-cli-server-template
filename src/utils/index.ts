import { Response } from "./interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { ObjectId } from "mongodb";
import logger from "./logger";

export function responseFormat(
  success: boolean,
  result?: { [key: string]: any } | string
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
    if (success) {
      logger.info(
        JSON.stringify({
          ...res,
          ...result,
        })
      );
    } else {
      logger.error(
        JSON.stringify({
          ...res,
          ...result,
        })
      );
    }
    return {
      ...res,
      ...result,
    };
  }

  if (success) {
    logger.info(JSON.stringify(res));
  } else {
    logger.error(JSON.stringify(res));
  }

  return res;
}

const PrivateKey = fs.readFileSync(
  path.resolve(process.cwd(), "./private.key"),
  "utf-8"
);

const PublicKey = fs.readFileSync(
  path.resolve(process.cwd(), "./public.key"),
  "utf-8"
);

export function formatToken(token: string): JwtPayload {
  return jwt.verify(token, PublicKey, { algorithms: ["RS256"] }) as JwtPayload;
}

export function generateToken(user: User.User) {
  return jwt.sign(user, PrivateKey, {
    expiresIn: 24 * 60 * 60 * 1000,
    algorithm: "RS256",
  });
}

export function formatQueryParams(query: any) {
  const pageParams = getPageQueryParams(query);

  query = filterPageQueryParams(Object.assign({}, query));
  const regexQuery: { [key: string]: RegExp | ObjectId } = {};
  const sortOptions: { [key: string]: 1 | -1 } = {};

  // 遍历查询参数对象，生成模糊查询对象
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      const value = query[key];
      if (value) {
        if (key === "_id") {
          regexQuery[key] = new ObjectId(value); // 对 _id 进行全匹配
        } else if (value === "ascend" || value === "descend") {
          sortOptions[key] = value === "ascend" ? 1 : -1;
        } else {
          const regex = new RegExp(value, "i");
          regexQuery[key] = regex;
        }
      }
    }
  }

  return {
    query: regexQuery,
    sortOptions,
    pageParams,
  };
}

export function filterPageQueryParams(query: any) {
  query = Object.assign({}, query);

  if ("current" in query) {
    delete query.current;
  }
  if ("pageSize" in query) {
    delete query.pageSize;
  }
  return query;
}

export function getPageQueryParams(query: any) {
  const { current = 1, pageSize = 10 } = query || {};

  const skip = (Number(current) - 1) * Number(pageSize);
  const limit = Number(pageSize);

  return { limit, skip, current: Number(current), pageSize: Number(pageSize) };
}

export function generateTimeForNow() {
  return new Date().getTime();
}
