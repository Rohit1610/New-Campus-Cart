const mongoose = require("mongoose");

// Define the seller schema to ensure proper structure
const sellerSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for user reference
    ref: "User", // Reference to the User model
    required: true,
  },
  name: { type: String, required: true },
  type: { type: String, required: true }, // Seller type (e.g., individual, business)
});

// Define the main product schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Ensure the name is required
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }, // Ensure price is a positive number
    quantity: { type: Number, required: true, min: 0 }, // Ensure quantity is not negative
    category: { type: String, required: true }, // Ensure category is provided
    condition: {
      type: String,
      enum: ["new", "used", "refurbished"],
      required: true,
    }, // Enums for product condition
    image: { type: String, required: true }, // Ensure an image URL is provided
    seller: { type: sellerSchema, required: true }, // Referencing the seller schema
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Product", productSchema);
