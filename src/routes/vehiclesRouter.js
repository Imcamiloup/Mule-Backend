import { Router } from "express";
import {
  getVehiclesHandler,
  createVehicleHandler,
  getVehicleByIdHandler,
  updateVehicleHandler,
  deleteVehicleHandler,
} from "../handlers/vehiclesHandler.js";

const vehiclesRouter = Router();

vehiclesRouter.post("/", createVehicleHandler);
vehiclesRouter.get("/", getVehiclesHandler);
vehiclesRouter.get("/:id", getVehicleByIdHandler);
// vehiclesRouter.put("/:id", getVehicleByIdHandler);
// vehiclesRouter.delete("/:id", getVehicleByIdHandler);

export default vehiclesRouter;