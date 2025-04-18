const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User schema definition
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"], // Validate email format
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensure the password is at least 6 characters long
    },
    role: {
      type: String,
      enum: ["student", "society", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if the password is modified
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt for hashing
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (err) {
    next(err); // Pass any errors to the next middleware
  }
});

// Method to compare provided password with the hashed password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Compare plain text password with hashed password
};

module.exports = mongoose.model("User", userSchema);
