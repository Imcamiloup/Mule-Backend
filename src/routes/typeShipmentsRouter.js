import { Router } from "express";

import {
  getOrCreateTypeShipmentsHandler,
  getTypeShipmentByIdHandler,
} from "../handlers/typeShipmentsHandler.js";

const TypeShipmentsRouter = Router();

TypeShipmentsRouter.get("/", getOrCreateTypeShipmentsHandler);
TypeShipmentsRouter.get("/:id", getTypeShipmentByIdHandler);

export default TypeShipmentsRouter;
