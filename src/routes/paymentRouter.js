import { Router } from "express";
const paymentRouter = Router();


import createPreferenceHandler from "../handlers/paymentHandler.js"

paymentRouter.post("/", createPreferenceHandler);

export default paymentRouter;
