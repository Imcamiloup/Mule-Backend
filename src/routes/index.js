import { Router } from "express";
import usersRouter from "./usersRouter.js";

const router = Router();


// Deshabilitar CORS en este componente (SOLO PARA PRUEBAS LOCALES)



router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});



// Here we define the routes
router.use("/users", usersRouter)
// router.use("/vehicles", vehiclesRouter);
// router.use("drivers", driversRouter);
// router.use("trips", tripsRouter);
// router.use("freights", authRouter);




export default router;
