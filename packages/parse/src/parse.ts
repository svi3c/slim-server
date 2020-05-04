import { Context, Middleware, ContextUpdate } from "@slim/core";

export const parseBody = <T = any>() => <
  C extends Context,
  A extends C & { requestBody: T }
>({
  req,
}: C) => {
  const contentType = req.headers["content-type"];
  return new Promise<T | null>((resolve) => {
    let body = "";
    req
      .on("data", (chunk) => (body += chunk))
      .on("end", () =>
        resolve(
          body
            ? contentType === "application/json"
              ? JSON.parse(body)
              : null
            : null,
        ),
      );
  }).then((requestBody) => ({ requestBody } as ContextUpdate<A>));
};
