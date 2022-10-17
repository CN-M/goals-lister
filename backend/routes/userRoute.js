const router = require('express').Router();
const {
  showUsers, registerUser, loginUser, deleteUser,
} = require('../controllers/userController');

router.route('/register')
  .post(registerUser);

router.route('/login')
  .post(loginUser);

router.route('/users')
  .get(showUsers);

router.route('/users/:id')
  .delete(deleteUser);

module.exports = router;
