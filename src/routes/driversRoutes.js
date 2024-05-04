import { Router } from "express";
import { 
  getAllDriversHandler,
  getDriverByIdHandler,
  postDriverHandler,
  updateDriverHandler,
  deleteDriverHandler
  } from "../handlers/driversHadlers.js";


const driver = Router();

driver.get("/", getAllDriversHandler);
driver.get("/:id", getDriverByIdHandler);

driver.post("/", postDriverHandler)

driver.put("/:id",updateDriverHandler);

driver.delete("/:id", deleteDriverHandler);

export default driver;