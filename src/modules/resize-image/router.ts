import express from "express";
import * as resizeSrv from "./service";
import { Resize } from "./resize.interface";
export const router = express.Router();

/**
 * Api for reszing image
 * @param {string} routePath
 * @param {callback} Callbackfn call back function holds the req: {express.Request} , res: {express.Response} ,
 * next:{express.NextFunction} and params: Resize for the route
 * @returns void
 */
router.get(
  "/resize/:imageName",
  function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const params: Resize = {
      imageName: req.params.imageName,
      width: req.query.width,
      height: req.query.height,
    };
    resizeSrv.resizeImage(res, next, params);
  }
);
