const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");



//middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  })
);

// routes
const UserRoutes = require("./src/app/modules/user/user.route");

app.use("/api", UserRoutes);

// app.use("/api",route)


app.get("/", (req, res) => {
  res.send("Electronix Backend! Server is running");
});

module.exports = app;

