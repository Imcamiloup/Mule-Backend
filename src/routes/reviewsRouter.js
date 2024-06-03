import { Router } from "express";
import {
  createReviewHandler,
  getReviewByIdHandler,
  getReviewsHandler,
} from "../handlers/reviewsHandler.js";

const reviewsRouter = Router();

reviewsRouter.post("/", createReviewHandler);
reviewsRouter.get("/", getReviewsHandler);
reviewsRouter.get("/:id", getReviewByIdHandler);

export default reviewsRouter;
