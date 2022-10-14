const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/mysqlDB');

// Import User model
const User = require('../models/User');

// Import JWT secret
const { JWT_SECRET } = process.env;

// Generate JWT
const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '60d' });

// Register user // POST
exports.registerUser = async (req, res) => {
  const {
    first_name, last_name, email, password,
  } = req.body;

  // Check if all fields are filled out
  if (!first_name || !last_name || !email || !password) {
    res.status(400);
    throw new Error('fill in all fields');
  }

  // Check if email already has account
  //   const userExists = await User.findOne({ email });
  //   if (userExists) {
  //     res.status(400);
  //     throw new Error('Email already registered');
  //   }

  // Hash password and create user account
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ('${first_name}', '${last_name}', '${email}', '${hashedPassword}')
    `,
    (err, data, fields) => {
      if (err) { res.status(400).json(err); }
      return res.status(200).json(fields);
    },
  );
  //   const user = await User.create({
  //     first_name,
  //     last_name,
  //     email,
  //     password: hashedPassword,
  //   });

//   if (user) {
//     res.status(201).json({
//       first_name,
//       last_name,
//       email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
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
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
};
