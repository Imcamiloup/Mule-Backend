import { Router } from "express";
const paymentRouter = Router();

import {
  createPreferenceHandler,
  getPaymentById,
  getPayments,
  successPayment,
  FailurePayment,
  pendingPayment,
} from "../handlers/paymentHandler.js";

paymentRouter.post("/", createPreferenceHandler);
paymentRouter.get("/", getPayments);
paymentRouter.get("/:id", getPaymentById);

paymentRouter.get("/success", successPayment);
paymentRouter.get("/failure", FailurePayment);
paymentRouter.get("/pending", pendingPayment);

export default paymentRouter;
