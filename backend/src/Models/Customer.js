const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true },
    address: String,
    contact: { type: String, required: true },
    type: { type: String, required: true, default: "occasional" },
  },
  { timestamps: true }
);

const customerModel = mongoose.model("customer", customerSchema);

module.exports = customerModel;
