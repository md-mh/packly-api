const express = require("express");
const routesUser = express.Router();
const { UserAll } = require("./UserAll");
const { UserById } = require("./UserById");
const { UserUpdate } = require("./UserUpdate");

routesUser.get("/all", UserAll);
routesUser.get("/:id", UserById);
routesUser.put("/update", UserUpdate);

module.exports = routesUser;
