import { Router } from "express";
import createVehicleHandler from "../handlers/createVehicleHandler.js";
import getVehiclesHandler from "../handlers/getVehiclesHandler.js"

const vehicleRouter = Router();

vehicleRouter.post("/new_vehicle", createVehicleHandler);
vehicleRouter.get("/vehicles", getVehiclesHandler);

export default vehicleRouter;
