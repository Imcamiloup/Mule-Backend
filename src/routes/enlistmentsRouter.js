import { Router } from "express";
import {
  createEnlistmentHandler,
  getEnlistmentsHandler,
  getEnlistmentByIdHandler,
  updateEnlistmentHandler,
  deleteEnlistmentHandler,
} from "../handlers/enlistmentsHandler.js";

const enlistmentsRouter = Router();

enlistmentsRouter.post("/", createEnlistmentHandler);
enlistmentsRouter.get("/", getEnlistmentsHandler);
enlistmentsRouter.get("/:id", getEnlistmentByIdHandler);
enlistmentsRouter.put("/:id", updateEnlistmentHandler);
enlistmentsRouter.delete("/:id", deleteEnlistmentHandler);

export default enlistmentsRouter;
