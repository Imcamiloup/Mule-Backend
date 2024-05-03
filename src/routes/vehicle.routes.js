import { Router } from "express";
import {
  getVehiclesHandler,
  createVehicleHandler,
  getVehicleByIdHandler,
} from "../handlers/vehiclesHandler.js";

const vehiclesRouter = Router();

vehiclesRouter.post("/", createVehicleHandler);
vehiclesRouter.get("/", getVehiclesHandler);
vehiclesRouter.get("/:id", getVehicleByIdHandler);

export default vehiclesRouter;
