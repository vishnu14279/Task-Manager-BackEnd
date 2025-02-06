const express = require("express");
const router = express.Router();
const { fetchUser } = require("../Controller/userController");

router.get("/fetchUser/:id", fetchUser);

module.exports = router;
