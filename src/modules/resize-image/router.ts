import express from "express";
import * as resizeSrv from "./service";
import { Resize } from "./resize.interface";
export const router = express.Router();

router.get("/resize/:imageName", function (req, res, next) {
  const params: Resize = {
    imageName: req.params.imageName,
    width: req.query.width,
    height: req.query.height,
  };
  return resizeSrv.resizeImage(res, next, params);
});
