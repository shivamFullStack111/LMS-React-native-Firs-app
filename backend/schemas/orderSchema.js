const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    course: Object,
    user: Object,
    ammount: Number,
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
