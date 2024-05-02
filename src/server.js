import express  from "express";
import jwt from "jsonwebtoken";
import router from "./routes/index.js";
import testRouter from "./routes/test.routes.js"
import morgan  from "morgan";
import cors  from "cors";
import { json, urlencoded } from "express";

const server = express();

server.use(morgan("dev")); //midleware get
// Importar y utilizar las funciones de middleware de Express
server.use(json()); // Middleware para parsear JSON

server.use(cors());

server.use(urlencoded({ extended: true }));

//Use the router for manage the routes
server.use(router);

server.get("/ping",function(req, res){
  res.send("pong");
});


server.use("/", testRouter);

export default server;
