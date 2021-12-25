import express from "express";
import process from "process";
import * as envConfig from "../config/env-config.json";
import { router as ResizeRouter } from "../src/modules/resize-image/router";
const app = express();
const port = process.env.PORT || envConfig.port;

app.use("/api", ResizeRouter);

app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log("listening on port", port);
});

export default app;
