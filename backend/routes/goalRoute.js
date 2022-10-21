const router = require('express').Router();

const {
  showGoals,
  showAllGoals,
  showOneGoal,
  createGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

const { protect, guard } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, showGoals)
  .post(protect, createGoal);

router.route('/:goalid')
  .get(protect, showOneGoal)
  .put(protect, updateGoal)
  .delete(protect, deleteGoal);

router.route('/all/goals')
  .get(guard, showAllGoals);

module.exports = router;
