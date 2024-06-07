import { Router } from "express";
import {
  getEnlistmentsHandler,
  getEnlistmentByIdHandler,
  getEnlistmentByGNHandler,
  patchEnlistmentHandler,
  deleteEnlistmentHandler,
} from "../handlers/enlistmentsHandler.js";

const enlistmentsRouter = Router();

enlistmentsRouter.get("/", getEnlistmentsHandler);
enlistmentsRouter.get("/:id", getEnlistmentByIdHandler);
enlistmentsRouter.get("/guide_number/:guide_number", getEnlistmentByGNHandler);
enlistmentsRouter.patch("/:id", patchEnlistmentHandler);
enlistmentsRouter.delete("/:id", deleteEnlistmentHandler);

export default enlistmentsRouter;
