import express from "express";
import * as resizeSrv from "./service";
import { Resize } from "./resize.interface";
export const router = express.Router();

/**
 * Api for reszing image
 * @param routePath
 * @param Callbackfn call back function holds the req , res , next params for the route
 * @returns void
 */
router.get("/resize/:imageName", function (req, res, next): void {
  const params: Resize = {
    imageName: req.params.imageName,
    width: req.query.width,
    height: req.query.height,
  };
  resizeSrv.resizeImage(res, next, params);
});
