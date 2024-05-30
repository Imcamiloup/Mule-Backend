import { Router } from "express";
import {
  getEnlistmentsHandler,
  getEnlistmentByIdHandler,
} from "../handlers/enlistmentsHandler.js";

const enlistmentsRouter = Router();

enlistmentsRouter.get("/", getEnlistmentsHandler);
enlistmentsRouter.get("/:id", getEnlistmentByIdHandler);

export default enlistmentsRouter;
