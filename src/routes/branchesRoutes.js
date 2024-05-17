import { Router } from "express";
import {
  createBranchHandler,
  getBranchesHandler,
  getBranchByIdHandler,
} from "../handlers/branchesHandlers.js";

const branchesRouter = Router();

branchesRouter.post("/", createBranchHandler);
branchesRouter.get("/", getBranchesHandler);
branchesRouter.get("/:id", getBranchByIdHandler);

export default branchesRouter;
