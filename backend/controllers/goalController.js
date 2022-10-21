// Import Goal model
const Goal = require('../models/Goal');

// Display ALL goals // GET // ADMIN ONLY
exports.showAllGoals = async (req, res) => {
  // Find ALL user goals
  const goals = await Goal.find({}, 'text user').populate('user', 'username email');
  if (goals.length < 1) {
    res.status(400);
    throw new Error('No Goals to display');
  } else {
    res.status(200).json({
      goals,
    });
  }
};

// Display all user goals // GET // ADMIN ONLY
exports.showGoals = async (req, res) => {
  const { id } = req.user;

  // Check if user is logged in
  if (!id) {
    res.status(400);
    throw new Error('User not logged in');
  }

  // Find user goals
  const goals = await Goal.find({ user: id }).populate('user', 'username email');
  if (goals.length < 1) {
    res.status(400);
    throw new Error('No Goals to display');
  } else {
    res.status(200).json(goals);
  }
};

// Display specific goal // GET
exports.showOneGoal = async (req, res) => {
  const { id } = req.user;
  const { goalid } = req.params;

  const goal = await Goal.findById(goalid);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (goal && goal.user.toString() === id) {
    return res.status(200).json(goal);
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
};

// Create Goal // POST
exports.createGoal = async (req, res) => {
  const { id } = req.user;
  const { text } = req.body;

  // Check if all fields are filled out
  if (!text) {
    res.status(400);
    throw new Error('fill in all fields');
  } else {
    const goal = await (await Goal.create({ text, user: id })).populate('user', 'username email');
    res.status(200).json(goal);
  }
};

// Update Goal // PUT
exports.updateGoal = async (req, res) => {
  const { id } = req.user;
  const { goalid } = req.params;
  const { text } = req.body;

  // Check if user is logged in
  if (!id) {
    res.status(401);
    throw new Error('User not found');
  }

  const goal = await Goal.findById(goalid);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (goal && goal.user.toString() === id) {
    const updatedGoal = await Goal.findByIdAndUpdate(goalid, { text }, { new: true }).populate('user', 'username email');
    res.status(200).json(updatedGoal);
  } else {
    res.status(401);
    throw new Error('User not authorized');
  }
};

// Delete Goal // DELETE
exports.deleteGoal = async (req, res) => {
  const { id } = req.user;
  const { goalid } = req.params;

  // Check for user
  if (!id) {
    res.status(401);
    throw new Error('User not found');
  }

  const goal = await Goal.findById(goalid);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  if (goal && goal.user.toString() === id) {
    res.status(200).json(`Goal ${goal.text} deleted`);
    await goal.deleteOne();
  } else {
    res.status(401);
    throw new Error('Not Authorized');
  }
};

// Delete Goal ALL Goals// DELETE // VERY DANGEROUS
// exports.deleteAllGoals = async (req, res) => {
//   const goals = await Goal.find();
//   if (goals.length < 1) {
//     res.status(400);
//     throw new Error('Goals not found');
//   } else {
//     res.status(200).json('All Goals purged');
//     await Goal.deleteMany({});
//   }
// };
