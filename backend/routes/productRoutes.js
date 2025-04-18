const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware"); // Add auth middleware for protected access
const { createProduct } = require('../controllers/productController'); 
// Get all products (public)
router.get("/", productController.getAll);

// Create new product (protected: only authenticated users)
router.post('/create', createProduct);

module.exports = router;
