import { Router } from "express";

import {
  getOrCreateMeasuresHandler,
  getMeasureByIdHandler,
} from "../handlers/measuresHandlers.js";

const measureRouter = Router();

measureRouter.get("/", getOrCreateMeasuresHandler);
measureRouter.get("/:id", getMeasureByIdHandler);

export default measureRouter;
