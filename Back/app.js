const express = require("express");
const app = express();
const path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const dbConfig = require("./app/config/database.config.js");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Connecting to the database
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Sunglasses Vacations - Havi Lev's Final Project.",
  });
});

//route config
const userRouter = require("./app/routes/users.routes.js");
const vacationRouter = require("./app/routes/vacation.routes.js");

// routes - listen for requests
require("./app/routes/users.routes")(app);
// app.use("/users", userRouter);
app.use("/vacations", vacationRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// http://127.0.0.1:5000/
app.listen(5000, () => {
  console.log(`Server is listening on port ${5000}`);
});

// ----------------------------------------------------------------
// socket.io
const http = require("http");

const port = 4001;
app.use(vacationRouter);

const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  app.set("socket", socket);
});

httpServer.listen(port, () =>
  console.log(`Socket is Listening on port ${port}`)
);
