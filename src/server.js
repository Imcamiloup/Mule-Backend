import express  from "express";
import jwt from "jsonwebtoken";
import router from "./routes/index.js";
import morgan  from "morgan";
import cors  from "cors";
import { json, urlencoded } from "express";
import vehicleRouter from "./routes/vehicle.routes.js";

const server = express();

server.use(cors());
server.use(morgan("dev")); //middleware get
server.use(express.json()); //middleware post

server.use(urlencoded({ extended: true }));
//Use the router for manage the routes
server.use(router);

server.get("/ping",function(req, res){
  res.send("pong");
});


server.use("/vehicle", vehicleRouter);

export default server;
