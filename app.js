const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIO = require("socket.io");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = require("./src/utils/swaggerOptions");
const routes = require("./src/controller/routes");
const { checkUser } = require("./src/hooks/checkUser");

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());

app.use(express.json());
app.use(cookieParser());

// Socket connection
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// WebSocket middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Initialize Swagger JSDoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Use Swagger UI to serve the API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/", checkUser(), routes);
app.get("/", (req, res) => {
  res.send("Server Running....");
});

server
  .listen(port, () => {
    console.log(`App listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error(`${err} `);
    process.exit(1);
  });
