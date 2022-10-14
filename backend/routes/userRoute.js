const router = require('express').Router();
const { registerUser, loginUser } = require('../controllers/userControllerSQL');
// const { registerUser, loginUser } = require('../controllers/userController');

router.route('/register')
  .post(registerUser);

router.route('/login')
  .post(loginUser);

module.exports = router;
