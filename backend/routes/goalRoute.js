const router = require('express').Router();

const {
  showGoals,
  showOneGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

router.route('/')
  .get(showGoals)
  .post(createGoal);

router.route('/:id')
  .get(showOneGoal)
  .put(updateGoal)
  .delete(deleteGoal);

module.exports = router;
