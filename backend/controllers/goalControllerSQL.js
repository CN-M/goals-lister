// Import db
const db = require('../config/mysqlDB');

// Display all goals // GET
exports.showGoals = (req, res) => {
  db.query(
    `
    SELECT * 
    FROM goals
    `,
    (err, goals) => {
      if (err) { res.status(400).json(err); }
      return res.status(200).json(goals);
    },
  );
};

// Display specific goal // GET
exports.showOneGoal = (req, res) => {
  const { id } = req.params;
  db.query(
    `
    SELECT * 
    FROM goals
    WHERE goal_id = ${id}
    `,
    (err, goal) => {
      if (err) { res.status(400).json(err); }
      return res.status(200).json(goal);
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
    db.query(
      `
        INSERT INTO goals (user_id, goal)
        VALUES (${user_id}, '${goal}');
        `,
      (err, data, fields) => {
        if (err) { res.status(400).json(err); }
        return res.status(200).json(data);
      },
    );
  }
};

// Update Goal // PUT
exports.updateGoal = (req, res) => {
  const { id } = req.params;
  const { goal, user_id } = req.body;
  db.query(
    `
    UPDATE goals
    SET goal = '${goal}'
    WHERE goal_id = ${id} AND user_id = ${user_id}
    `,
    (err, data) => {
      if (err) { res.status(400).json(err); }
      return res.status(200).json(data);
      //   return res.status(200).json(`Goal ${goal.} deleted`);
    },
  );
};

// Delete Goal // DELETE
exports.deleteGoal = (req, res) => {
  const { id } = req.params;
  db.query(
    `
    DELETE FROM goals
    WHERE goal_id = ${id}
    `,
    (err, results) => {
      if (err) { res.status(400).json(err); }
      return res.status(200).json(results);
    //   return res.status(200).json(`Goal ${goal.} deleted`);
    },
  );
};
