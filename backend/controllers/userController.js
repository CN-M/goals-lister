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
    throw new Error('No Goals to display');
  } else {
    res.status(200).json(users);
  }
};

// Register user // POST
exports.registerUser = async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;

  // Check if all fields are filled out
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error('fill in all fields');
  }

  // Check if email already has account
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Email already registered');
  }

  // Hash password and create user account
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      firstName,
      lastName,
      email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// Loign user // POST
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if all fields are filled out
  if (!email || !password) {
    res.status(400);
    throw new Error('fill in all fields');
  }

  // Log user in
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
};

// Delete Goal // DELETE // ADMIN ONLY
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  } else {
    res.status(200).json(`User ${user.name} deleted`);
    await user.remove();
  }
};
