const bcrypt = require('bcrypt');

// Register user // POST
exports.registerUser = async (req, res) => {
  res.status(200).json('register user');
};

// Loign user // POST
exports.loginUser = async (req, res) => {
  res.status(200).json('login user');
};
