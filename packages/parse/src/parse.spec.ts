import { parseBody } from "./parse";
import { createServer } from "http";
import { slim } from "@slim/core";
import * as phin from "phin";

describe("parse()", () => {
  it("should work", async () => {
    const server = createServer(
      slim(parseBody<{ foo: string }>(), ({ requestBody }) => ({
        body: requestBody,
      })),
    );
    await new Promise((resolve) => server.listen(1235, resolve));
    const res = await phin({
      method: "POST",
      data: { foo: "bar" } as any,
      url: "http://localhost:1235",
      parse: "json",
    });
    expect(res.body).toEqual({ foo: "bar" });
    expect(res.headers["content-type"]).toEqual("application/json");
    await new Promise((resolve) => server.close(resolve));
  });
});
