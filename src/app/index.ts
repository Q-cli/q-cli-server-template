import koa from "koa";
import bodyParser from "koa-bodyparser";
import errorHandle from "../utils/error-handle";
import useRouter from "../router";
import dayjs from "dayjs";
import { logRequestInfoMiddleware, vertifyAuth } from "../utils";

const app = new koa();

app.use(bodyParser());

app.use(vertifyAuth);
app.use(logRequestInfoMiddleware);

// app.use((ctx, next) => {
//   console.log(`${dayjs().format("YYYY-MM-DD HH:mm:ss")} ${ctx.request.url} ${ctx.user?.name ?? ''}`);
//   next();
// });

useRouter(app);

app.on("error", errorHandle);

export default app;
