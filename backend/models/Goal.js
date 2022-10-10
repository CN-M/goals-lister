const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

GoalSchema.virtual('url').get(
  function() {
    return `${this.name}`;
  },
);

module.exports = mongoose.model('Goal', GoalSchema);
