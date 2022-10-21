const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import User model
const User = require('../models/User');

// Import JWT secret
const { JWT_SECRET } = process.env;

// Generate JWT
const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '60d' });

// Display all users // GET // ADMIN ONLY
exports.showUsers = async (req, res) => {
  const users = await User.find();
  if (users.length < 1) {
    res.status(400);
    throw new Error('No Users to display');
  } else {
    res.status(200).json(users);
  }
};

// Register user // POST
exports.registerUser = async (req, res) => {
  const {
    email, password, profile_pic,
  } = req.body;

  const username = req.body.username.toLowerCase();

  // Check if all fields are filled out
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('fill in all fields');
  }

  // Check if email already has account
  const emailTaken = await User.findOne({ email });
  if (emailTaken) {
    res.status(400);
    throw new Error('Email already registered');
  }

  // Check if email already has account
  const usernameTaken = await User.findOne({ username });
  if (usernameTaken) {
    res.status(400);
    throw new Error('Username already taken');
  }

  // Hash password and create user account
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    profile_pic,
  });

  if (user) {
    res.status(201).json({
      username,
      email,
      token: generateToken(user._id),
      profile_pic,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// Loign user // POST
exports.loginUser = async (req, res) => {
  // const { username, email, password } = req.body;
  const { password } = req.body;
  const username = req.body.username.toLowerCase();

  // Check if all fields are filled out
  // if (!(email || username) || !password) {
  if (!username || !password) {
    res.status(400);
    throw new Error('fill in all fields');
  }

  // Log user in
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
};

// Delete User // DELETE // ADMIN ONLY
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  } else {
    res.status(200).json(`User ${user.username} deleted`);
    await user.deleteOne();
  }
};

// Delete ALL UserS // DELETE // VERY DANGEROUS
// exports.deleteAllUsers = async (req, res) => {
//   const users = await User.find();
//   if (users.length < 1) {
//     res.status(400);
//     throw new Error('Users not found');
//   } else {
//     res.status(200).json('All Users purged');
//     await User.deleteMany({});
//   }
// };
