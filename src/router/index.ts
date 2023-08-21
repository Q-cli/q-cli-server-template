import fs from "fs";
import Application from "koa";

export default function useRouter(app: Application) {
  fs.readdirSync(__dirname).forEach(async (dir) => {
    if (dir !== "index.ts") {
      const router = await import(`./${dir}`);

      app.use(router.default.routes());
      app.use(router.default.allowedMethods());
    }
  });
}
