const User = require("../Model/User");

const fetchUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("username email"); 

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ name: user.username, email: user.email, userId: user._id });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { fetchUser };
