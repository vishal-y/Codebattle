const User = require("../Models/RegisterUser");

// Update user details
exports.updateUser = async (req, res) => {
  const { username, name, email, about, DP } = req.body;
  try {
    const userToUpdate = await User.findOne({ username });
    if (!userToUpdate) return res.status(401).json({ error: "Username not found" });

    if (name) userToUpdate.name = name;
    if (email) userToUpdate.email = email;
    if (about) userToUpdate.about = about;
    if (DP) userToUpdate.DP = DP;

    await userToUpdate.save();
    res.json({ user: { username: userToUpdate.username, name: userToUpdate.name, email: userToUpdate.email, about: userToUpdate.about, DP: userToUpdate.DP }, message: "User updated successfully" });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user details
exports.getUser = async (req, res) => {
  console.log("Request Body:", req.body);
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ name: user.name, username: user.username, email: user.email, about: user.about, DP: user.DP });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};
