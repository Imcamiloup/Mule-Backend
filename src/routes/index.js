import { Router } from "express";
import usersRouter from "./usersRouter.js";
import vehiclesRouter from "./vehiclesRouter.js";
import driversRouter from "./driversRoutes.js";
import enlistmentsRouter from "./enlistmentsRouter.js";
import orderShipmentsRouter from "./orderShipmentsRouter.js";

const router = Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Here we define the routes
router.use("/users", usersRouter);
router.use("/vehicles", vehiclesRouter);
router.use("/drivers", driversRouter);
router.use("/enlistments", enlistmentsRouter);
router.use("/order_shipments", orderShipmentsRouter)

export default router;
