const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.route('/register')
  .get(registerUser);

router.route('/login')
  .get(loginUser);

module.exports = router;
