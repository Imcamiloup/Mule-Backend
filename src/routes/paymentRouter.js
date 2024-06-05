import { Router } from "express";
const paymentRouter = Router();

import {
  createPreferenceHandler,
  getPaymentById,
  getPaymentTypes,
  getPayments,
  getPaymentsByEmail,
} from "../handlers/paymentHandler.js";

paymentRouter.get("/payment_types", getPaymentTypes);
paymentRouter.post("/", createPreferenceHandler);
paymentRouter.get("/", getPayments);
paymentRouter.get("/:email", getPaymentsByEmail);
paymentRouter.get("/:id", getPaymentById);

export default paymentRouter;
