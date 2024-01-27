const paypal = require("paypal-rest-sdk");

class GatewayPaypal {
  constructor() {
    this.paypal = this.initializedSDK();
  }

  initializedSDK() {
    return paypal.configure({
      mode: process.env.PAYPAL_MODE,
      client_id: process.env.PAYPAL_CLIENT_ID,
      client_secret: process.env.PAYPAL_CLIENT_SECRET,
    });
  }

  async doSale(amount, currency) {
    const params = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: process.env.PAYPAL_URL_SUCCESS,
        cancel_url: process.env.PAYPAL_URL_CANCEL,
      },
      transactions: [
        {
          amount: {
            currency: currency?.toUpperCase(),
            total: amount,
          },
        },
      ],
    };

    return new Promise((resolve, reject) => {
      paypal.payment.create(params, (err, response) => {
        if (err) {
          throw new Error(err);
        }
        resolve(response);
      });
    });
  }

  async executeSale(payerId, paymentId, amount, currency) {
    const executeParams = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: currency,
            total: amount,
          },
        },
      ],
    };

    return new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId, executeParams, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}

module.exports = GatewayPaypal;
