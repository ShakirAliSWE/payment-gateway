const { CustomerOrders } = require("../models/customer-orders.model");

class CustomerOrder {
  constructor() {}

  async add(columns) {
    try {
      const request_at = Date.now();
      const currency = columns?.currency.toUpperCase();
      const res = new CustomerOrders({
        ...columns,
        currency,
        request_at,
      });

      return await res.save();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async update(_id, columns) {
    try {
      const res = await CustomerOrders.findOneAndUpdate(
        {
          _id,
        },
        columns
      );

      return res;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findByTransactionId(transactionId) {
    try {
      const res = await CustomerOrders.find({
        payment_transaction_id: transactionId,
      });

      if (!res.length) {
        throw new Error("No record found for transaction " + transactionId);
      }

      return res[0];
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = CustomerOrder;
