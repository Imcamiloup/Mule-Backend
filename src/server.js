const express = require("express");
const server = express();

const { json } = require(express);
const testRouter = require("./routes/test.routes");

server.use(json());
server.use(express.urlencoded({ extended: true }));

server.use("/", testRouter);

module.exports = server;
