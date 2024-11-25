const express = require("express");
const router = express.Router();

const ProductController = require("./product.controller");
const { verifyToken } = require("../../middleware/verifyToken");
const { verify } = require("jsonwebtoken");
const verifyAdmin = require("../../middleware/verifyAdmin");


// create a product

router.post("/create-product", ProductController.creteNewProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProducts);


router.patch("/update-product/:id", verifyToken, verifyAdmin, ProductController.updateProductById);
router.delete("/delete-product/:id",verifyToken, verifyAdmin, ProductController.deleteProductById);

module.exports = router;

