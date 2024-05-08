import { Router } from "express";
import {
 getDriverByIdHandler,
  postDriverHandler,
  updateDriverHandler,
  deleteDriverHandler,
  getAllDriversHandler
} from "../handlers/driversHadlers.js";
const driver = Router();

driver.get("/", getAllDriversHandler);
driver.get("/:id", getDriverByIdHandler);

driver.post("/", postDriverHandler)

driver.put("/:id", updateDriverHandler);

driver.delete("/:id", deleteDriverHandler);

export default driver;