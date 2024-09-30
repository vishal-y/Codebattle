const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  console.log("Token added" , req.cookies);
  
  // Access the token from cookies
  const token = req.cookies ? req.cookies.auth_token : null;

  if (!token) {
    // Redirect user to login page if token is not present
    return res.status(401).json({ error: "Unauthorized, please log in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId; // Store user ID in request object
    console.log("USER IS AUTHENTICATED")
    next(); // Proceed to the next middleware/route handler
  } catch (e) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
