// Import Goal model
const Goal = require('../models/Goal');

// Display all goals // GET
exports.showGoals = async (req, res) => {
  const goals = await Goal.find();
  if (goals.length < 1) {
    res.status(400);
    throw new Error('No Goals to display');
  } else {
    res.status(200).json(goals);
  }
};

// Display specific goal // GET
exports.showOneGoal = async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await Goal.findById(id);
    if (goal) return res.status(200).json(goal);
  } catch (error) {
    res.status(400);
    throw new Error('Goal not found');
  }
};

// Create Goal // POST
exports.createGoal = async (req, res) => {
  const { name, username } = req.body;

  // Check if all fields are filled out
  if (!name || !username) {
    res.status(400);
    throw new Error('fill in all fields');
  } else {
    const goal = await Goal.create({ name, username });
    res.status(200).json(goal);
  }
};

// Update Goal // PUT
exports.updateGoal = async (req, res) => {
  const { id } = req.params;
  const { name, username } = req.body;
  try {
    const goal = await Goal.findById(id);
    if (goal) {
      const updatedGoal = await Goal.findByIdAndUpdate(id, { name, username }, { new: true });
      res.status(200).json(updatedGoal);
    }
  } catch (error) {
    res.status(400);
    throw new Error('Goal not found');
  }
};

// Delete Goal // DELETE
exports.deleteGoal = async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  } else {
    res.status(200).json(`Goal ${goal.name} deleted`);
    await goal.remove();
  }
};
