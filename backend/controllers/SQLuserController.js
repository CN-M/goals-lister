const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import db
const db = require('../config/mysqlDB');

// Import JWT secret
const { JWT_SECRET } = process.env;

// Generate JWT
const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '60d' });

// Display all users // GET // ADMIN ONLY
exports.showUsers = (req, res) => {
  db.execute(
    'SELECT * FROM users',
    (err, users) => {
      if (err) { res.status(400).json(err); }
      if (users.length < 1) return res.status(400).json('No users to display');
      return res.status(200).json(users);
    },
  );
};

// Register user // POST
exports.registerUser = (req, res) => {
  const {
    first_name, last_name, email, password,
  } = req.body;

  // Check if all fields are filled out
  if (!first_name || !last_name || !email || !password) {
    res.status(400);
    throw new Error('fill in all fields');
  }

  // Check if email already has account
  db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, user) => {
      if (err) { res.status(400).json(err); }
      if (user.length > 0) return res.status(400).json('Account already exists for this email');

      // Hash password and create user account
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.execute(
        'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
        [first_name, last_name, email, hashedPassword],
        (err, data) => {
          if (err) { res.status(400).json(err); }
        },
      );

      // Return registered user details + token
      db.execute(
        'SELECT * FROM users WHERE user_id = LAST_INSERT_ID()',
        (err, user) => {
          if (err) { res.status(400).json(err); }

          const {
            first_name, last_name, email, user_id,
          } = user[0];
          return res.status(200).json({
            first_name,
            last_name,
            email,
            token: generateToken(user_id),
          });
        },
      );
    },
  );
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
  db.execute(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, user) => {
      if (err) { res.status(400).json(err); }
      if (user.length < 1) return res.status(400).json('User account not found');

      // Validate password
      const isPasswordCorrect = bcrypt.compareSync(password, user[0].password);
      if (!isPasswordCorrect) return res.status(400).json('Incorrect credentials');

      // Return logged in user details + token
      const { first_name, last_name, email } = user[0];
      return res.status(200).json({
        first_name,
        last_name,
        email,
        token: generateToken(user[0].user_id),
      });
    },
  );
};

// Delete User // DELETE // ADMIN ONLY
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  // Check if user exists
  db.execute(
    'SELECT * FROM users WHERE user_id = ?',
    [id],
    (err, user) => {
      if (err) { res.status(400).json(err); }
      if (user.length < 1) return res.status(400).json('User not found');

      // If user exists, delete it
      db.execute(
        'DELETE FROM users WHERE user_id = ?',
        [id],
        (err, data) => {
          if (err) { res.status(400).json(err); }
          return res.status(200).json('User deleted');
        },
      );
    },
  );
};
