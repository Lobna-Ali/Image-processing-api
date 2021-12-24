import { Resize } from "./resize.interface";
import { readFile } from "../../utils/file-utils";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import * as envConfig from "../../../config/env-config.json";

/**
 * Main Function that handle reszing image logic
 * if the image is already resized and saved no need to resize again
 * if not will call the resizedWithSharo function to resize image
 * @param { Resize } params
 */
export const resizeImage = (res, next, params: Resize) => {
  try {
    // check if the sizes provided for resizing is valid or not first of all before doing any logic
    if (!isNaN(Number(params.height)) && !isNaN(Number(params.width))) {
      const toFile = createResizedPath(params);
      const data = readMainImage(res, next, params);
      // check if the resied image is already exist
      if (fs.existsSync(toFile)) {
        res.sendFile(toFile).end();
      } else {
        reziedWithSharp(res, next, params, data, toFile);
      }
    } else {
      res
        .status(400)
        .json({ error: { message: envConfig.invalidSizingMsg } })
        .end();
      next(envConfig.invalidSizingMsg);
    }
  } catch (err) { }
};

/**
 * Check the existance of the image that need to be resized if it exist will read it if not
 * will throw an error that the image is not found
 * @param res
 * @param next
 * @param params
 */
const readMainImage = (res, next, params) => {
  const imageToResize = path.join(
    __dirname + envConfig.fromImageSrc + params.imageName
  );
  try {
    if (fs.existsSync(imageToResize)) {
      return readFile(imageToResize);
    } else {
      res.status(404).json({ error: { message: envConfig.reziedMsgNotFound } });
      throw "";
    }
  } catch (err) {
    res
      .status(400)
      .json({ error: { message: envConfig.general } })
      .end();
    next(envConfig.general);
  }
};

/**
 * Create the path that will hold the resized images and the resized image name
 * @param params
 * @returns string
 */
const createResizedPath = (params): string => {
  const imageName = params.imageName?.substr(0, params.imageName.indexOf("."));

  const imageExtenstion = params.imageName.substr(
    params.imageName.indexOf("."),
    params.imageName.length - 1
  );

  return path.join(
    __dirname +
    envConfig.toImageSrc +
    (imageName +
      "_" +
      params.width.toString() +
      "_" +
      params.height.toString() +
      imageExtenstion)
  );
};

/**
 * resize the main image and store it in the folder for resized images
 * @param res
 * @param next
 * @param params
 * @param data
 * @param toFile
 * @returns Promise <any>
 */
export const reziedWithSharp = async (
  res,
  next,
  params,
  data,
  toFile
): Promise<any> => {
  try {
    await sharp(data)
      .resize({
        width: Number(params.width),
        height: Number(params.height),
      })
      .toFile(toFile);

    res.sendFile(toFile);
  } catch (error) {
    res
      .status(400)
      .json({ error: { message: envConfig.invalidSizingMsg } })
      .end();
    next(envConfig.invalidSizingMsg);
  }
};
