import { Router } from "express";
const paymentRouter = Router();

import {
  createPreferenceHandler,
  getPaymentById,
  getPayments,
} from "../handlers/paymentHandler.js";

paymentRouter.post("/", createPreferenceHandler);
paymentRouter.get("/", getPayments);
paymentRouter.get("/:id", getPaymentById);

export default paymentRouter;
