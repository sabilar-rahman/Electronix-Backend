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
        status:
          session.payment_intent.status === "succeeded" ? "pending" : "pending",
      });
    } else {
      order.status =
        session.payment_status === "succeeded" ? "pending" : "pending";
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

const getOrderByEmail = async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }
  // const orders = await Order.find({ email: req.params.email });
  try {
    const orders = await Order.find({ email: email });

    if (orders.length === 0 || !orders) {
      return res.status(404).send({ orders: 0, message: "Orders not found" });
    }

    res.status(200).send({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ message: "Failed to fetch orders", error });
  }
};


const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send(order); //to get object
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send({ message: "Failed to fetch order", error });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).send({ orders: [], message: "Orders not found" });
    }

    res.status(200).send({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ message: "Failed to fetch orders", error });
  }
};

module.exports = {
  makePaymentRequest,
  confirmPayment,
  getOrderByEmail,
  getOrderById,
  getAllOrders
};
