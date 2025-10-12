const express = require("express");
const routesAuth = express.Router();
const { Register } = require("./Register");
const { Login } = require("./Login");
const { Verify } = require("./Verify");

routesAuth.post("/register", Register);
routesAuth.post("/login", Login);
routesAuth.post("/verify", Verify);

module.exports = routesAuth;
