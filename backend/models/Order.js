const mongoose = require("mongoose");

// Define a schema for the shipping address to ensure it's structured properly
const shippingAddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

// Define the main order schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId for user references
      ref: "User", // Referencing the User model for better data integrity
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Use ObjectId for product references
          ref: "Product", // Referencing the Product model
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true }, // Ensure the product image is included
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
    shippingAddress: { type: shippingAddressSchema, required: true }, // Referencing the shipping address schema
    trackingNumber: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

module.exports = mongoose.model("Order", orderSchema);
