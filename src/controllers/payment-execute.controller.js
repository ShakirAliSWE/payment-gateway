const CustomerOrder = require("../classes/customer-order");
const GatewayPaypal = require("../classes/gateway-paypal");
const { returnResponse } = require("../utils/server-response");

const customerOrder = new CustomerOrder();
const paypal = new GatewayPaypal();

const paymentExecuteController = async (req, res) => {
  const { PayerID: payerId, paymentId } = req.query;

  try {
    const orderTransaction = await customerOrder.findByTransactionId(paymentId);
    const resPayment = await paypal.executeSale(
      payerId,
      paymentId,
      orderTransaction?.amount,
      orderTransaction?.currency
    );

    await customerOrder.update(orderTransaction?._id, {
      payment_status: true,
      payment_respone_message: "Payment proceed successfully",
    });

    // return returnResponse(res, 200, "success", "Payment executed successfully", {
    //   paymentMethod: "PAYPAL",
    //   transactionId: resPayment?.id,
    // });

    const m = `success|Payment proceed successfully, PAYPAL transaction id is ${resPayment?.id}`;
    return res.redirect(`../../?m=${btoa(m)}`);
  } catch (err) {
    returnResponse(res, 400, "error", err?.message);
  }
};

module.exports = paymentExecuteController;
