require("dotenv").config(); // Ensure .env is loaded

// const crypto = require("crypto");
// const secretkey =  crypto.randomBytes(64).toString("hex");
const jwtSecret = process.env.JWT_SECRET 
// console.log(secretkey,"newkey");
module.exports = {
  secret: jwtSecret,  
};
