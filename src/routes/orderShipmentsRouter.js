import { Router } from "express";
import upload from "../handlers/orderShipmentsHandler.js";

import {
  getAllOrderShipmentsHandler,
  createOrderShipmentHandler,
  getOrderShipmentByIdHandler,
  updateOrderShipmentHandler,
  deleteOrderShipmentHandler,
} from "../handlers/orderShipmentsHandler.js";

const orderShipmentsRouter = Router();

orderShipmentsRouter.get("/",  getAllOrderShipmentsHandler);
orderShipmentsRouter.post("/", upload.single("image"), createOrderShipmentHandler);
orderShipmentsRouter.get("/:id", getOrderShipmentByIdHandler);
orderShipmentsRouter.put("/:id", updateOrderShipmentHandler);
orderShipmentsRouter.delete("/:id", deleteOrderShipmentHandler);

export default orderShipmentsRouter;
