const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
require("dotenv").config();
const app = require("./app");
const port = 5000;


// database connection
mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Server Connected successfully!"));


// server
app.get("/", (req, res) => {
    res.send("Electronix Backend! Server is running");
});

app.listen(port, () => {
    console.log(`Electronix Backend app Running on port ${port}`);
});