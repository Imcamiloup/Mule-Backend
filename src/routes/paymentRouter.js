import { Router } from "express";
const paymentRouter = Router();

import {
  createPreferenceHandler,
  getPaymentById,
  getPaymentTypes,
  getPayments,
  successPayment,
  getPaymentsByEmail,
  FailurePayment,
  pendingPayment,
} from "../handlers/paymentHandler.js";

paymentRouter.get("/payment_types", getPaymentTypes);
paymentRouter.post("/", createPreferenceHandler);
paymentRouter.get("/", getPayments);
paymentRouter.get("/:email", getPaymentsByEmail);
paymentRouter.get("/:id", getPaymentById);

paymentRouter.get("/success", successPayment);
paymentRouter.get("/failure", FailurePayment);
paymentRouter.get("/pending", pendingPayment);

export default paymentRouter;
