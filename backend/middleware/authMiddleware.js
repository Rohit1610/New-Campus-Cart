const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  // Get token from Authorization header
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { checkAuth };
