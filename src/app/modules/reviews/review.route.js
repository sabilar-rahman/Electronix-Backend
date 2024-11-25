const express = require("express");
const router = express.Router();

const ReviewController = require("./review.controller");
const { verifyToken } = require("../../middleware/verifyToken");

const verifyAdmin = require("../../middleware/verifyAdmin");


// create a product

router.post("/post-review", ReviewController.postReview);
// router.get("/", ProductController.getAllProducts);
// router.get("/:id", ProductController.getSingleProducts);


// router.patch("/update-product/:id", verifyToken, verifyAdmin, ProductController.updateProductById);
// router.delete("/delete-product/:id",verifyToken, verifyAdmin, ProductController.deleteProductById);

module.exports = router;
