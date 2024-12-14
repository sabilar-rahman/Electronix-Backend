// const { BASE_URL } = require("../../../utils/baseURL");
const Order = require("./order.model");
const router = require("./order.route");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const stripe = require("stripe")("sk_test_51QPrFdCiH3MasAqeJSq0zvdErUo2WGUyDsgcKKYE6utp5jSpqq9L8DcJdQCjFDptqiE0FqKkBzDpF6kp8OHiP5tK00Hbzo1bEy");
const stripe = require("stripe")(
  "sk_test_51QQ0FdCBNb0TvzzSOvdh3DxaKqO2UYeYmXDauss3iiJY3l3W4govUC0Y5rsuNRGsXUKnLHrIw5DCoKhcuPxPusUd001ZekXgP8"
);

const makePaymentRequest = async (req, res) => {
  const { products, userId } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const BASE_URL = "http://localhost:5173";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${BASE_URL}/cancel`,
  });
  res.json({ id: session.id });
};


const confirmPayment = async (req, res) => {

  const { session_id } = req.body;

  try {
    
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntentId = session.payment_intent.id;
  let order = await Order.findOne({ orderId: paymentIntentId });

  if (!order) {
    const lineItems = session.line_items.data.map((item) => ({
      productId: item.price.product,
      quantity: item.quantity,
    }));

    const amount = session.amount_total / 100;
    order = new Order({
      orderId: paymentIntentId,
      products: lineItems,
      amount,
      email: session.customer_details.email,
      status: session.payment_intent.status === "succeeded" ? "pending" : "failed",
    });
  } else {
    order.status =
      session.payment_status === "succeeded" ? "pending" : "failed";
  }

  await order.save();
  return res
    .status(200)
    .send({ message: "Order confirmed Successfully", order });
   } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).send({ message: "Failed to confirm payment", error });
  }


  
};

module.exports = {
  makePaymentRequest,
  confirmPayment,
};
