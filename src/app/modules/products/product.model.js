const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        oldPrice: { type: Number },
        color: { type: String },
        image: { type: String },
        rating: { type: Number, default: 0 },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
