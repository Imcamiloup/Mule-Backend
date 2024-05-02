import { Router } from "express";
import driver from "./DriverRoutes/driverRoutes.js";


const router = Router();

// Deshabilitar CORS en este componente (SOLO PARA PRUEBAS LOCALES)
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

// Here we define the routes
router.use("/endpoint1", (req, res, next) => {
  console.log("endpoint1");
  next();
});

router.use("/driver", driver);

export default router;