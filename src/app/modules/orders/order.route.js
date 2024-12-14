const express = require("express");
const { makePaymentRequest, confirmPayment } = require("./order.controller");
const router = express.Router();




// create checkout session
router.post("/create-checkout-session", makePaymentRequest);

// confirm payment
router.post("/confirm-payment", confirmPayment);


module.exports = router;   