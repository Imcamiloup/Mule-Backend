import { Router } from "express";
import { getDriverHandler } from "../../handlers/getDriverHadlers.js";
import { postDriverHandler } from "../../handlers/postDriverHandlers.js";


const driver = Router();

driver.get("/", getDriverHandler);

driver.post("/", postDriverHandler)

export default driver;