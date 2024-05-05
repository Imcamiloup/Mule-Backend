import express from "express";
import jwt from "jsonwebtoken";
import router from "./routes/index.js";
import morgan from "morgan";
import cors from "cors";

const server = express();

server.use(cors());
server.use(morgan("dev")); //middleware get
server.use(express.json()); //middleware post
server.use(express.urlencoded({ extended: true }));
//Use the router for manage the routes

server.use(router);

export default server;
