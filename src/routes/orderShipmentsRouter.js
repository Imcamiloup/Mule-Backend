import { Router } from "express";

import {
  getAllOrderShipmentsHandler,
  createOrderShipmentHandler,
  getOrderShipmentByIdHandler,
  deleteOrderShipmentHandler,
} from "../handlers/orderShipmentsHandler.js";

const orderShipmentsRouter = Router();

orderShipmentsRouter.get("/", getAllOrderShipmentsHandler);
orderShipmentsRouter.post("/", createOrderShipmentHandler);
orderShipmentsRouter.get("/:id", getOrderShipmentByIdHandler);
orderShipmentsRouter.delete("/:id", deleteOrderShipmentHandler);

export default orderShipmentsRouter;
