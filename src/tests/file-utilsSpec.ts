/* eslint-disable */ 
import { readFile } from '../utils/file-utils';
import * as envConfig from "../../config/env-config.json";

describe("file utils", () => {
  it('expect readFile return a defined value', () => {
    expect(readFile(__dirname + envConfig.fromImageSrc + 'sea.jpg')).toBeDefined();
  });
});