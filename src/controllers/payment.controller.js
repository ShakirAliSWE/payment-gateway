const CustomerOrder = require("../classes/customer-order");
const GatwayBraintree = require("../classes/gateway-braintree");
const GatewayPaypal = require("../classes/gateway-paypal");
const RequestValidator = require("../controllers/request-validator");
const { returnResponse } = require("../utils/server-response");

const customerOrder = new CustomerOrder();
const paypal = new GatewayPaypal();
const braintree = new GatwayBraintree();

const paymentController = async (req, res, next) => {
  try {
    const requestValidator = new RequestValidator(req.body);
    requestValidator.validate();

    const paymentMethod = requestValidator.detectPaymentMethod();
    if (paymentMethod === "PAYPAL") {
      return await proceedWithPaypal(req, res);
    } else if (paymentMethod === "BRAINTREE") {
      return await proceedWithBraintree(req, res);
    }

    returnResponse(res, 400, "error", "No payment method found ");
  } catch (err) {
    returnResponse(res, 400, "error", err?.message);
  }
};

const proceedWithPaypal = async (req, res) => {
  const { amount, fullName, currency } = req.body;
  try {
    const { id, links } = await paypal.doSale(amount, currency);
    let redirectURL = "";
    for (let i = 0; i < links.length; i++) {
      if (links[i].rel === "approval_url") {
        redirectURL = links[i].href;
        break;
      }
    }

    await customerOrder.add({
      amount,
      currency,
      customer_full_name: fullName,
      payment_gateway: "paypal",
      payment_transaction_id: id,
      payment_status: true,
      payment_respone_message: "Payment created successfully",
    });

    return returnResponse(res, 200, "success", "Payment created successfully", {
      paymentMethod: "PAYPAL",
      paymentId: id,
      redirectURL,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const proceedWithBraintree = async (req, res) => {
  const { amount, currency, fullName, cardNumber, cardExpiry, cardCCV } = req.body;

  try {
    const resPayment = await braintree.doSale(amount, fullName, cardNumber, cardExpiry, cardCCV);
    await customerOrder.add({
      amount,
      currency,
      customer_full_name: fullName,
      payment_gateway: "braintree",
      payment_transaction_id: resPayment?.transaction?.id,
      payment_status: resPayment?.success,
      payment_respone_message: resPayment?.success
        ? "Payment proceed successfully"
        : resPayment?.message,
    });

    if (!resPayment?.success) {
      throw new Error(resPayment?.message);
    }

    return returnResponse(
      res,
      200,
      "success",
      `Payment proceed successfully, BRAINTREE transaction id is ${resPayment?.transaction?.id}`,
      {
        paymentMethod: "BRAINTREE",
        transactionId: resPayment?.transaction?.id,
      }
    );
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = paymentController;
