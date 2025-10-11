const express = require("express");
const routes = express.Router();
const routesAuth = require("./auth/routesAuth");
const routesUser = require("./user/routesUser");
const routesContent = require("./content/routeContent");

routes.use("/content", routesContent);
routes.use("/auth", routesAuth);
routes.use("/user", routesUser);

module.exports = routes;
