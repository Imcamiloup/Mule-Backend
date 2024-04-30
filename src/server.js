import express from "express";
import { json, urlencoded } from "express";
import testRouter from "./routes/test.routes.js";

const server = express();

server.use(json());
server.use(urlencoded({ extended: true }));

server.use("/", testRouter);

export default server;
