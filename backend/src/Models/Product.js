const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true },
    unitNo: { type: String, required: true },
    manufacture: { type: String, required: true },
    manufactureDate: { type: String, required: true },
    expireDate: { type: String, required: true },
    picture: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
