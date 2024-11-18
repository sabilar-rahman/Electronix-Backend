const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

// routes
const UserRoutes = require("./src/app/modules/user/user.route");

app.use("/api/user", UserRoutes);

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

module.exports = app;
