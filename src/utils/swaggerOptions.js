const { api } = require("./setting");
const swaggerJson = require("./swaggerOutput.json");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description:
        "A simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: api,
      },
    ],
    basePath: "/",
    schemes: ["http", "https"],
    paths: swaggerJson.paths,
  },
  apis: ["./src/controller/routes.js"],
};

module.exports = swaggerOptions;
