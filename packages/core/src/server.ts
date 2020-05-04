import { ServerResponse } from "http";
import { Middleware, Slim, Context, Use } from "./types";

export const slim: Use<Context> = (...middleware) => {
  const instance: Slim = async (req, res) => {
    const ctx: Context = { req, res };
    for (let fn of middleware) {
      const update = await fn(ctx);
      if (typeof update === "object") {
        Object.assign(ctx, update);
      }
      if (ctx.body || ctx.status) {
        break;
      }
    }
    defaultResponseHandler(ctx, res);
  };
  instance.use = (...fn: Middleware<any, any>[]) => {
    middleware.push(...fn);
    return instance;
  };
  return instance;
};

const defaultResponseHandler = (ctx: Context, res: ServerResponse) => {
  res.statusCode = ctx.status || (ctx.body ? 200 : 404);
  if (typeof ctx.body === "object") {
    setFallbackHeader(res, "Content-Type", "application/json");
    res.write(JSON.stringify(ctx.body));
    res.end();
  } else if (typeof ctx.body === "string") {
    setFallbackHeader(res, "Content-Type", "text/plain");
    res.write(ctx.body);
    res.end();
  } else {
    res.end();
  }
};

const setFallbackHeader = (res: ServerResponse, name: string, val: string) => {
  if (!res.getHeader(name)) {
    res.setHeader(name, val);
  }
};
