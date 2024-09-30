const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/RegisterUser");
const cookieOptions = {
  httpOnly: true, // Prevents JavaScript access to the cookie
  secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  maxAge: 3600000, // 1 hour
};

// Register user logic
exports.register = async (req, res) => {
  const { username, email, password, name, about, DP } = req.body;
  try {
    if (await User.findOne({ username })) return res.status(401).json({ error: "Username not available" });
    if (await User.findOne({ email })) return res.status(401).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, email, password: hashedPassword, about, DP });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: "1hr" });
    res.cookie('auth_token', token, cookieOptions);
    res.status(201).json({ user: { _id: newUser._id, username: newUser.username, name: newUser.name, email: newUser.email }, message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login user logic
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userRecord = await User.findOne({ username });
    if (!userRecord) return res.status(401).json({ error: "Incorrect username" });

    const match = await bcrypt.compare(password, userRecord.password);
    if (!match) return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign({ userId: userRecord._id }, process.env.SECRET_KEY, { expiresIn: "1hr" });
    res.cookie('auth_token', token, cookieOptions);
    res.json({ user: { _id: userRecord._id, username: userRecord.username, name: userRecord.name, email: userRecord.email }, message: "Login successful" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Logout user logic
exports.logout = async (req, res) => {
  try {
    res.clearCookie('auth_token'); // Adjust cookie name if necessary
    res.status(200).json({ message: 'Logout successful.' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'An error occurred while logging out.' });
  }
};
