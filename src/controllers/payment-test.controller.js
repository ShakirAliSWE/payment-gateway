const RequestValidator = require("./request-validator");
const { returnResponse } = require("../utils/server-response");

const paymentTestController = async (req, res, next) => {
  try {
    const requestValidator = new RequestValidator(req.body);
    requestValidator.validate();
    const paymentMethod = requestValidator.detectPaymentMethod();
    returnResponse(res, 200, "success", "Payment created successfully", {
      paymentMethod: paymentMethod,
      cardType: requestValidator.getCreditCardType(req.body?.cardNumber),
    });
  } catch (err) {
    returnResponse(res, 400, "error", err?.message);
  }
};

module.exports = paymentTestController;
