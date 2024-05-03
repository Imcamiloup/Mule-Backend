import { Router } from "express";
import {
  getVehiclesHandler,
  createVehicleHandler,
} from "../handlers/vehiclesHandler.js";

const vehiclesRouter = Router();

vehiclesRouter.post("/", createVehicleHandler);
vehiclesRouter.get("/", getVehiclesHandler);

export default vehiclesRouter;
