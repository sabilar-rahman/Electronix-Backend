const express = require("express");
const router = express.Router();

const ProductController = require("./product.controller");


// create a product

router.post("/create-product",ProductController.creteNewProduct);
router.get("/",ProductController.getAllProducts);
router.get("/:id",ProductController.getSingleProducts);

module.exports = router;

