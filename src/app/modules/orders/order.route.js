const express = require("express");
const { makePaymentRequest, confirmPayment ,getOrderByEmail ,getOrderById,getAllOrders , updateOrderStatus} = require("./order.controller");
const { updateOne } = require("./order.model");
const router = express.Router();


// update order status 
router.patch('/update-order/:id',updateOrderStatus)


// create checkout session
router.post("/create-checkout-session", makePaymentRequest);

// confirm payment
router.post("/confirm-payment", confirmPayment);

// get order by email address
router.get("/:email", getOrderByEmail);

// get orders by id
router.get('/order/:id',getOrderById)


//get all order
router.get('/',getAllOrders)




module.exports = router;   