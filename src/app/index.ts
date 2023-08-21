import koa from "koa";
import bodyParser from "koa-bodyparser";
import userRoter from "../router/user";
import errorHandle from "../utils/error-handle";
import authRouter from "../router/auth";
import useRouter from "../router";

const app = new koa();

app.use(bodyParser());

// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());

// app.use(userRoter.routes());
// app.use(userRoter.allowedMethods());

useRouter(app);

app.on("error", errorHandle);

export default app;
