// Display all goals // GET
exports.showGoals = async (req, res) => {
  res.status(200).json('Display all goals');
};

// Display specific goal // GET
exports.showOneGoal = async (req, res) => {
  res.status(200).json(`Display goal ${req.params.id}`);
};

// Create Goal // POST
exports.createGoal = async (req, res) => {
  res.status(200).json('Set goal');
};

// Update Goal // PUT
exports.updateGoal = async (req, res) => {
  res.status(200).json(`Update goal ${req.params.id}`);
};

// Delete Goal // DELETE
exports.deleteGoal = async (req, res) => {
  res.status(200).json(`Delete goal ${req.params.id}`);
};
