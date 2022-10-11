const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.virtual('username').get(
  function() {
    return `${this.firstName} ${this.lastName}`;
  },
);

module.exports = mongoose.model('User', UserSchema);
