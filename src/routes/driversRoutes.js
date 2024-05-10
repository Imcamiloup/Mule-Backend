import { Router } from "express";
import {
  getAllDriversHandler,
  getDriverByIdHandler,
  getOrderByDriversHandler,
  getFilteredByDriversHandler,
  postDriverHandler,
  updateDriverHandler,
  deleteDriverHandler,
} from "../handlers/driversHadlers.js";

const driverRouter = Router();

driverRouter.get("/", getAllDriversHandler);
driverRouter.get("/:id", getDriverByIdHandler);
driverRouter.get("/:id/order", getOrderByDriversHandler )
driverRouter.get("/:id/filter", getFilteredByDriversHandler )

driverRouter.post("/", postDriverHandler);

driverRouter.put("/:id", updateDriverHandler);

driverRouter.delete("/:id", deleteDriverHandler);

export default driverRouter;
