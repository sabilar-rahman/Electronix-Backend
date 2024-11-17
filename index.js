const express = require("express");
require("dotenv").config();
const app = express();
const port = 5000;
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Server Connected successfully!"));

app.get("/", (req, res) => {
  res.send("Electronix Backend! Server is running");
});

app.listen(port, () => {
  console.log(`Electronix Backend app Running on port ${port}`);
});
