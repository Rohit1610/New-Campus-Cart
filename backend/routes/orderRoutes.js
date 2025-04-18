const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const router = express.Router();

// Route to create a new order
router.post('/', createOrder);

// Route to get all orders for a specific user
router.get('/:userId', getUserOrders);

module.exports = router;
