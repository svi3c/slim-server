import { slim } from "./server";
import { createServer } from "http";
import * as phin from "phin";

describe("slim", () => {
  it("should work", async () => {
    const server = createServer(slim(() => ({ body: { foo: "bar" } })));
    await new Promise((resolve) => server.listen(1234, resolve));
    const res = await phin({ url: "http://localhost:1234", parse: "json" });
    expect(res.body).toEqual({ foo: "bar" });
    await new Promise((resolve) => server.close(resolve));
  });
});
