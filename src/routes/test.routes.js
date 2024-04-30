const { Router } = require("express");
const testFunction = require("../controllers/testController");

const testRouter = Router();

testRouter.get("/", testFunction);

module.exports = testRouter;
