import { readFile } from "../utils/file-utils";
import * as envConfig from "../../config/env-config.json";
import path from "path";

describe("file utils", () => {
  it("expect readFile return a defined value", () => {
    expect(
      readFile(path.join(__dirname + envConfig.fromImageSrc + "sea.jpg"))
    ).toBeDefined();
  });
});
