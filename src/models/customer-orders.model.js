const mongoose = require("mongoose");
const customerOrdersSchema = new mongoose.Schema({
  amount: { type: Number, require: true },
  currency: { type: String, require: true },
  customer_full_name: { type: String, require: true },
  payment_gateway: { type: String, require: true },
  payment_transaction_id: { type: String, require: true, default: null },
  payment_status: { type: Boolean, require: true, default: false },
  payment_respone_message: { type: String, require: true, default: null },
  request_at: { type: Number },
});

const CustomerOrders = mongoose.model("customer_orders", customerOrdersSchema);

module.exports = { CustomerOrders };
