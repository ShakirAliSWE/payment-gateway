const braintree = require("braintree");

class GatwayBraintree {
  constructor() {
    this.braintree = this.initializeSDK();
  }

  initializeSDK() {
    return new braintree.BraintreeGateway({
      environment: braintree.Environment.Sandbox,
      merchantId: process.env.BRAINTREE_MERCHANTID,
      publicKey: process.env.BRAINTREE_PUBLIC_KEY,
      privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    });
  }

  async doSale(amount, holderName, number, expMonthYear, cvv) {
    const [expMonth, expYear] = expMonthYear.split("/");
    const params = {
      amount,
      creditCard: {
        cardholderName: holderName,
        number,
        expirationMonth: expMonth,
        expirationYear: expYear,
        cvv,
      },
      paymentMethodNonce: "fake-valid-nonce",
      options: {
        submitForSettlement: true,
      },
    };

    return await this.braintree.transaction.sale(params);
  }
}

module.exports = GatwayBraintree;
