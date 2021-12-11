const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    id: String,
    name: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: Boolean,
    picture: String,
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
