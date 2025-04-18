const Order = require("../models/Order");
const { checkAuth } = require("../middleware/authMiddleware"); // Make sure to have authentication middleware

// Create an Order
exports.createOrder = async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  // Basic validation
  if (!userId || !items || !totalAmount) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const order = new Order({
      userId,
      items,
      totalAmount,
      status: "pending", // Default order status
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating order" });
  }
};

// Get Orders for a User
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch orders for the specific user
    const orders = await Order.find({ userId });
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching orders" });
  }
};
