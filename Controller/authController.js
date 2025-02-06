const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const authConfig = require("../config/authConfig.js");

const comparePassword = (enteredPassword, storedPassword) => {
  return enteredPassword === storedPassword;
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password: password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
   const isMatch = comparePassword(password, user.password);
    console.log("Password match status:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, authConfig.secret, { expiresIn: "1hr" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

const logout = async (req, res) => {
  res.json({ message: "User logged out" });
};

module.exports = {
  register,
  login,
  logout,
};
