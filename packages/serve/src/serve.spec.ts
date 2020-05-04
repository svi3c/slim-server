import { createServer, Server } from "http";
import { slim, Slim } from "@slim/core";
import * as phin from "phin";
import { sendFile, setMimeTypes } from "./serve";

const PORT = 1236;

describe("serve", () => {
  let server: Server;
  let app: Slim;

  beforeEach(() => {
    setMimeTypes({});
    return new Promise(
      (resolve) =>
        (server = createServer((app = slim())).listen(PORT, resolve)),
    );
  });
  afterEach(() => new Promise((resolve) => server.close(resolve)));

  describe("sendFile()", () => {
    it("should send a file with content type", async () => {
      app.use(sendFile(`${__dirname}/../package.json`));

      const res = await phin({
        url: "http://localhost:1236",
        parse: "json",
      });

      expect(res.body).toEqual(
        expect.objectContaining({ name: "@slim/serve" }),
      );
      expect(res.headers["content-type"]).toEqual("text/plain");
    });
  });

  describe("setMimeTypes()", () => {
    it("should set the mime types object used by sendFile() and serve()", async () => {
      setMimeTypes({ json: "x-application/json" });
      app.use(sendFile(`${__dirname}/../package.json`));

      const res = await phin("http://localhost:1236");

      expect(res.headers["content-type"]).toEqual("x-application/json");
    });
  });
});
