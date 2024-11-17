// const express = require("express");
// require("dotenv").config();
//  const app = express();
//  const port = 5000;
// const mongoose = require("mongoose");
// const cors = require("cors");
// const router  = require("./src/routes/route");
// ---------------------------------------------------
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./src/routes/route.js";
const app = express();
const port = 5000;

// HERE Import used instead of const because base path is different

dotenv.config();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  })
);

// module routes
app.use("/api", router);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Server Connected successfully!"));

app.get("/", (req, res) => {
  res.send("Electronix Backend! Server is running");
});

app.listen(port, () => {
  console.log(`Electronix Backend app Running on port ${port}`);
});
