import koa from "koa";
import bodyParser from "koa-bodyparser";
import log4js from "koa-log4";
import cookie from "koa-cookie";
import errorHandle from "../utils/error-handle";
import useRouter from "../router";
import { logRequestInfoMiddleware, vertifyAuth } from "../middleware/common";

const app = new koa();

app.use(cookie());
app.use(log4js.koaLogger(log4js.getLogger("http"), { level: "auto" }));
app.use(bodyParser());
app.use(logRequestInfoMiddleware);
app.use(vertifyAuth);

useRouter(app);

app.on("error", errorHandle);

export default app;
