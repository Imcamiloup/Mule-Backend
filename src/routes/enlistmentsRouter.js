import { Router } from "express";
import {
  getEnlistmentsHandler,
  getEnlistmentByIdHandler,
  patchEnlistmentHandler,
  deleteEnlistmentHandler,
} from "../handlers/enlistmentsHandler.js";

const enlistmentsRouter = Router();

enlistmentsRouter.get("/", getEnlistmentsHandler);
enlistmentsRouter.get("/:id", getEnlistmentByIdHandler);
enlistmentsRouter.patch("/:id", patchEnlistmentHandler);
enlistmentsRouter.delete("/:id", deleteEnlistmentHandler);

export default enlistmentsRouter;
