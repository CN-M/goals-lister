const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
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
