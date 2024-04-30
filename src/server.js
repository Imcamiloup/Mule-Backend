const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev")); //midleware get
server.use(express.json()); //midleware post
server.use(cors());

server.use(urlencoded({ extended: true }));
  //Use the router for manage the routes
  server.use(router);

  server.get("/ping",function(req, res){
      res.send("pong");
    });


server.use("/", testRouter);

export default server;
