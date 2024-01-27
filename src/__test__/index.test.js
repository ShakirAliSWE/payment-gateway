const request = require("supertest");
const app = require("./../app");

const ENDPOINT_PAYMENT = "/api/payment-test";
const CREDIT_CARD_NUMBER_AMEX = "371449635398431";

const params = {
  amount: 10,
  currency: "USD",
  fullName: "Shakir Ali",
  cardHolderName: "Shakir Ali",
  cardNumber: "4111111111111111",
  cardExpiry: "02/2029",
  cardCCV: "646",
};

describe("Payment Gateway API", () => {
  it("Should use Paypal if the credit card type is AMEX", async () => {
    const res = await request(app).post(ENDPOINT_PAYMENT).send(params);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.paymentMethod).toBe("PAYPAL");
  });

  it("Should return an error if the credit card type is AMEX and the currency is not USD", async () => {
    const res = await request(app)
      .post(ENDPOINT_PAYMENT)
      .send({
        ...params,
        currency: "SGD",
        cardNumber: CREDIT_CARD_NUMBER_AMEX,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Error: AMEX is only possible to use for USD");
  });

  describe("If the currency is USD, EUR, or AUD, use Paypal; otherwise, use Braintree", () => {
    it("Should use Paypal if the currency is USD", async () => {
      const res = await request(app)
        .post(ENDPOINT_PAYMENT)
        .send({ ...params, currency: "USD" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.paymentMethod).toBe("PAYPAL");
    });

    it("Should use Paypal if the currency is EUR", async () => {
      const res = await request(app)
        .post(ENDPOINT_PAYMENT)
        .send({ ...params, currency: "EUR" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.paymentMethod).toBe("PAYPAL");
    });

    it("Should use Braintree if the currency is SGD", async () => {
      const res = await request(app)
        .post(ENDPOINT_PAYMENT)
        .send({ ...params, currency: "SGD" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.paymentMethod).toBe("BRAINTREE");
    });

    it("Should use Braintree if the currency is THB", async () => {
      const res = await request(app)
        .post(ENDPOINT_PAYMENT)
        .send({ ...params, currency: "THB" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.paymentMethod).toBe("BRAINTREE");
    });
  });
});
