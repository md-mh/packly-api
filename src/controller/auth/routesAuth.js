const express = require("express");
const routesAuth = express.Router();
const { Register } = require("./Register");
const { Login } = require("./Login");

routesAuth.post("/register", Register);
routesAuth.post("/login", Login);

module.exports = routesAuth;
