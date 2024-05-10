import { Router } from "express";

import {
  getAllMeasuresHandler,
  getMeasureByIdHandler,
  postMeasureHandler,
  updateMeasureHandler,
  deleteMeasureHandler,
} from "../handlers/measuresHandlers.js";

const measureRouter = Router();

measureRouter.get("/", getAllMeasuresHandler);
measureRouter.get("/:id", getMeasureByIdHandler);

measureRouter.post("/", postMeasureHandler);

measureRouter.put("/:id", updateMeasureHandler);

measureRouter.delete("/:id", deleteMeasureHandler);

export default measureRouter;
