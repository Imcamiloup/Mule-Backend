import { Router } from "express";
import {
  getEnlistmentsHandler,
  getEnlistmentByIdHandler,
  patchEnlistmentHandler
} from "../handlers/enlistmentsHandler.js";

const enlistmentsRouter = Router();

enlistmentsRouter.get("/", getEnlistmentsHandler);
enlistmentsRouter.get("/:id", getEnlistmentByIdHandler);
enlistmentsRouter.patch("/:id", patchEnlistmentHandler);

export default enlistmentsRouter;
