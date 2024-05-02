import express from "express";
import morgan from "morgan";
import cors from "cors";
import { json, urlencoded } from "express";
import vehicleRouter from "./routes/vehicle.routes.js";

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(json());

server.use(urlencoded({ extended: true }));

server.use("/vehicle", vehicleRouter);

export default server;
