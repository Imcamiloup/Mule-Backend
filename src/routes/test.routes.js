import { Router } from "express";

const testRouter = Router();

testRouter.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

export default testRouter;
