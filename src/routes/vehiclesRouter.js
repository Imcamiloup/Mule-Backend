import { Router } from "express";
import {
  getVehiclesHandler,
  getVehicleByIdHandler,
  updateVehicleHandler,
  updateVehicleHandler,
} from "../handlers/vehiclesHandler.js";

const vehiclesRouter = Router();

vehiclesRouter.get("/", getVehiclesHandler);
vehiclesRouter.post("/", createVehicleHandler);
vehiclesRouter.get("/:id", getVehicleByIdHandler);
vehiclesRouter.patch("/:id", updateVehicleHandler);

export default vehiclesRouter;
