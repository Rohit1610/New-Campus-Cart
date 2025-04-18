const Product = require("../models/Product");
const { checkAuth } = require("../middleware/authMiddleware"); // Authentication middleware

// Fetch all products
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;

  // Basic validation
  if (!name || !description || !price || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      createdAt: new Date(),
      reviews: [],
      averageRating: 0,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Get product by ID (for details page)
exports.getById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// Update a product
exports.update = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, category, imageUrl } = req.body;

  // Basic validation
  if (!name || !description || !price || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, category, imageUrl },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete a product
exports.delete = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
