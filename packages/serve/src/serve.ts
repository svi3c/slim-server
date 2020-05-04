import { MimeTypes } from "./types";
import { Middleware, Context } from "@slim/core";
import { createReadStream } from "fs";
import * as path from "path";

let mimeTypes: MimeTypes;

export const setMimeTypes = (mime: MimeTypes) => (mimeTypes = mime);

export const sendFile = (file: string) => <C extends Context>(ctx: C) =>
  new Promise((resolve) => {
    ctx.res.setHeader(
      "Content-Type",
      mimeTypes?.[path.extname(file).substr(1)] || "text/plain",
    );
    createReadStream(path.resolve(file)).pipe(ctx.res).on("close", resolve);
  });
