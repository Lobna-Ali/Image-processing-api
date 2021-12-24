import fs from "fs";

/**
 * Read file using fs package
 * @param filePath
 * @returns Buffer
 */
export const readFile = (filePath): Buffer => {
  return fs.readFileSync(filePath);
};
