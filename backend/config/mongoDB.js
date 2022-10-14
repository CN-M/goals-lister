const mongoose = require('mongoose');
const { DB_URI } = process.env;

exports.connectDB = async () => {
  try {
    const db = await mongoose.connect(DB_URI);
    console.log(`DB Connected: ${db.connection.host}`.magenta.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
