import express from "express";
import router from "./routes/index.js";
import cookie from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
// const { FRONT_END_URL } = process.env;

const server = express();

server.use(cors());
server.use(morgan("dev")); //middleware get
server.use(cookie());
server.use(express.json()); //middleware post
server.use(express.urlencoded({ extended: true }));
//Use the router for manage the routes

server.use(router);

export default server;
