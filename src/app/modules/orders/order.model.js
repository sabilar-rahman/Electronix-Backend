const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {

    //userId: { type: String },
    orderId: String,
    email: { type: String, required: true },
    amount: Number,
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "completed"],
      default: "pending",
    },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
