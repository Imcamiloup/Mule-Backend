import { Router } from "express";

import {
    getAllTypeShipmentsHandler,
    createTypeShipmentHandler,
    getTypeShipmentByIdHandler,
    updateTypeShipmentHandler,
    deleteTypeShipmentHandler,
} from "../handlers/TypeShipmentsHandler.js";

const TypeShipmentsRouter = Router();

TypeShipmentsRouter.get("/", getAllTypeShipmentsHandler);
TypeShipmentsRouter.post("/", createTypeShipmentHandler);
TypeShipmentsRouter.get("/:id", getTypeShipmentByIdHandler);
TypeShipmentsRouter.put("/:id", updateTypeShipmentHandler);
TypeShipmentsRouter.delete("/:id", deleteTypeShipmentHandler);

export default TypeShipmentsRouter;