const mongoose = require("mongoose");

const manufactureSchema = mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true },
    license: String,
    address: { type: String, required: true },
    picture: String,
  },
  { timestamps: true }
);

const manufactureModel = mongoose.model("manufacture", manufactureSchema);

module.exports = manufactureModel;
