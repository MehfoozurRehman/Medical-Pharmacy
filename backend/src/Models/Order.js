const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    id: String,
    orderDate: { type: String, required: true },
    paymentDate: { type: String, required: true },
    customerId: { type: String, required: true },
    products: { type: Array, required: true },
    amountPaid: { type: Number, required: true },
    discount: Number,
    note: String,
    status: String,
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
