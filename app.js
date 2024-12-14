const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')




//middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

// routes
const UserRoutes = require("./src/app/modules/user/user.route");
const ProductsRoutes = require("./src/app/modules/products/product.route");
const ReviewsRoutes = require("./src/app/modules/reviews/review.route");
const ordersRoutes = require("./src/app/modules/orders/order.route");
const stateRoutes = require("./src/app/modules/stats/stats.route")

app.use("/api", UserRoutes);
app.use("/api/products", ProductsRoutes);
app.use("/api/reviews", ReviewsRoutes);

app.use("/api/orders", ordersRoutes);

app.use('/api/stats',stateRoutes)

// app.use("/api",route)


app.get("/", (req, res) => {
  res.send("Electronix Backend! Server is running");
});

module.exports = app;

