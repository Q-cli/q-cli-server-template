import log4js from "koa-log4";
import path from "path";
import config from "../app/config";

log4js.configure({
  // 设置日志规则
  appenders: {
    access: {
      type: "dateFile",
      pattern: "-yyyy-MM-dd.log",
      daysToKeep: 7,
      layout: {
        type: "pattern",
        pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] %m",
      },
      filename: path.join("back-end/logs/", "access.log"),
    },
    httpRule: {
      type: "dateFile", // 日志输出的类型例如
      pattern: "-yyyy-MM-dd.log",
      daysToKeep: 7, // 日志保留的天数
      layout: {
        type: "pattern",
        pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] %m", // 输出日志的格式
      },
      filename: path.join("back-end/logs/", "http.log"), // 存储日志文件的位置
    },
    // 控制台输出
    out: {
      type: "stdout",
    },
  },
  // 配置日志的分类
  categories: {
    default: { appenders: ["out"], level: "all" },
    access: { appenders: ["access"], level: "all" },
    http: { appenders: ["httpRule"], level: "all" },
  },
});

const logger = log4js.getLogger();

logger.level = "debug";

export default logger;
