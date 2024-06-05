import { Router } from "express";
import {
  getVehiclesHandler,
  getVehicleByIdHandler,
  updateVehicleHandler,
  createVehicleHandler,
} from "../handlers/vehiclesHandler.js";

const vehiclesRouter = Router();

vehiclesRouter.get("/", getVehiclesHandler);
vehiclesRouter.post("/", createVehicleHandler);
vehiclesRouter.get("/:id", getVehicleByIdHandler);
vehiclesRouter.post("/", createVehicleHandler);
vehiclesRouter.patch("/:id", updateVehicleHandler);

export default vehiclesRouter;
