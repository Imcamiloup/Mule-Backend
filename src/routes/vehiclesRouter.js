import { Router } from "express";
import {
  getVehiclesHandler,
  getVehicleByIdHandler,
  updateVehicleHandler,
} from "../handlers/vehiclesHandler.js";

const vehiclesRouter = Router();

vehiclesRouter.get("/", getVehiclesHandler);
vehiclesRouter.get("/:id", getVehicleByIdHandler);
vehiclesRouter.patch("/:id", updateVehicleHandler);

export default vehiclesRouter;
