import { Router } from "express";

import {
    getAllOrderShipmentsHandler,
    createOrderShipmentHandler,
    getOrderShipmentByIdHandler,
    updateOrderShipmentHandler,
    deleteOrderShipmentHandler,
} from "../handlers/orderShipmentHandler.js";

const orderShipmentsRouter = Router();

orderShipmentsRouter.get("/", getAllOrderShipmentsHandler);
orderShipmentsRouter.post("/", createOrderShipmentHandler);
orderShipmentsRouter.get("/:id", getOrderShipmentByIdHandler);
orderShipmentsRouter.put("/:id", updateOrderShipmentHandler);
orderShipmentsRouter.delete("/:id", deleteOrderShipmentHandler);

export default orderShipmentsRouter;