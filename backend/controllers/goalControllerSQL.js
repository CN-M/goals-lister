// Import db
const db = require('../config/mysqlDB');

// Display all goals // GET
// exports.showGoals = (req, res) => {
//   db.execute(
//     'SELECT * FROM goals',
//     (err, goals) => {
//       if (err) { res.status(400).json(err); }
//       return res.status(200).json(goals);
//     },
//   );
// };

exports.showGoals = async (req, res) => {
// db.execute(
//   'SELECT * FROM goals',
//   (err, goals) => {
//     if (err) { res.status(400).json(err); }
//     return res.status(200).json(goals);
//   },
// );
  const goals = await db.execute('SELECT * FROM goals');
  // if (goals.length === 0) return res.status(400).json('No goals to display');
  return res.status(200).json(goals);
};

// Display specific goal // GET
exports.showOneGoal = (req, res) => {
  const { id } = req.params;
  db.execute(
    'SELECT * FROM goals WHERE goal_id = ?',
    [id],
    (err, goal) => {
      if (err) { res.status(400).json(err); }
      return res.status(200).send(goal);
    },
  );
};

// Create Goal // POST
exports.createGoal = (req, res) => {
  const { goal, user_id } = req.body;

  // Check if all fields are filled out
  if (!goal || !user_id) {
    res.status(400);
    throw new Error('fill in all fields');
  } else {
    // Create new goal
    db.execute(
      'INSERT INTO goals (user_id, goal) VALUES (?, ?)',
      [user_id, goal],
      (err, data) => {
        if (err) { res.status(400).json(err); }
      },
    );

    // Return created goal
    db.execute(
      'SELECT * FROM goals WHERE goal_id = LAST_INSERT_ID()',
      (err, goal) => {
        if (err) { res.status(400).json(err); }
        return res.status(200).json(goal);
      },
    );
  }
};

// Update Goal // PUT
exports.updateGoal = (req, res) => {
  const { id } = req.params;
  const { goal, user_id } = req.body;
  // Update goal
  db.execute(
    'UPDATE goals SET goal = ? WHERE goal_id = ? AND user_id = ?',
    [goal, id, user_id],
    (err, data) => {
      if (err) { res.status(400).json(err); }
    },
  );

  // Return updated goal
  db.execute(
    'SELECT * FROM goals WHERE goal_id = ?',
    [id],
    (err, goal) => {
      if (err) { res.status(400).json(err); }
      return res.status(200).json(goal);
    },
  );
};

// Delete Goal // DELETE
exports.deleteGoal = (req, res) => {
  const { id } = req.params;

  // Check if goal exists
  db.execute(
    'SELECT * FROM goals WHERE goal_id = ?',
    [id],
    (err, goal) => {
      if (err) { res.status(400).json(err); }

      // Goal does not exist
      if (goal.length === 0) return res.status(400).json('Goal not found');

      // If goal exists, delete it
      db.execute(
        'DELETE FROM goals WHERE goal_id = ?',
        [id],
        (err, data) => {
          if (err) { res.status(400).json(err); }
          return res.status(200).json('Goal deleted');
        },
      );
    },
  );
};
