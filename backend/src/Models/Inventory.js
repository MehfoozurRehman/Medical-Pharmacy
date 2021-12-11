const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    productUnitNo: { type: String, required: true },
    costSold: Number,
    costPurchased: Number,
    amountSold: Number,
    amountPurchased: Number,
    amountRemaining: Number,
  },
  { timestamps: true }
);

const inventoryModel = mongoose.model("inventory", inventorySchema);

module.exports = inventoryModel;
