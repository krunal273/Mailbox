const mongoose = require("mongoose");
const validator = require("validator");

const EmailSchema = new mongoose.Schema({
  to: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  from: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  subject: {
    type: String
  },
  message: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: {
      values: ["sent", "receive", "archive", "delete"]
    }
  }
});

const User = mongoose.model("Email", EmailSchema);

module.exports = User;
