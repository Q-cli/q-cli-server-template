import koa from "koa";
import bodyParser from "koa-bodyparser";
import errorHandle from "../utils/error-handle";
import useRouter from "../router";
import { logRequestInfoMiddleware, vertifyAuth } from "../middleware/common";

const app = new koa();

app.use(bodyParser());

app.use(vertifyAuth);
app.use(logRequestInfoMiddleware);

useRouter(app);

app.on("error", errorHandle);

export default app;
