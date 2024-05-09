import { Router } from "express";

import {
  getAllShipmentHandler,
  createShipmentHandler,
  getShipmentByIdHandler,
  updateShipmentHandler,
  deleteShipmentHandler,
} from "../handlers/orderShipmentsHandler.js";

const orderShipmentsRouter = Router();

orderShipmentsRouter.get("/", getAllShipmentHandler);
orderShipmentsRouter.post("/", createShipmentHandler);
orderShipmentsRouter.get("/:id", getShipmentByIdHandler);
orderShipmentsRouter.put("/:id", updateShipmentHandler);
orderShipmentsRouter.delete("/:id", deleteShipmentHandler);

export default orderShipmentsRouter;
