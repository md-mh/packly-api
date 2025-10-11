const express = require("express");
const routesContent = express.Router();
const { ContentAll } = require("./ContentAll");
const { ContentById } = require("./ContentById");
const { ContentAdd } = require("./ContentAdd");
const { ContentUpdate } = require("./ContentUpdate");
const { ContentDelete } = require("./ContentDelete");
const { ContentBulkOrders } = require("./ContentBulkOrders");
// const { checkRole } = require("../../hooks/checkRole");

routesContent.get("/all", ContentAll);
routesContent.get("/:id", ContentById);
routesContent.post("/add", ContentAdd);
routesContent.put("/update", ContentUpdate);
routesContent.delete("/:id", ContentDelete);
routesContent.put("/bulk-orders", ContentBulkOrders);

// checkRole if necessary
// routesContent.get("/all", checkRole("admin"), ContentAll);
// routesContent.get("/:id", checkRole("admin"), ContentById);
// routesContent.post("/add", checkRole("admin"), ContentAdd);
// routesContent.put("/update", checkRole("admin"), ContentUpdate);
// routesContent.delete("/:id", checkRole("admin"), ContentDelete);
// routesContent.put("/bulk-orders", checkRole("admin"), ContentBulkOrders);

module.exports = routesContent;
