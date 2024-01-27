const Validations = require("./../classes/validation");

class RequestValidator extends Validations {
  constructor(props) {
    super(props);
    this.amount = props?.amount;
    this.currency = props?.currency;
    this.fullName = props?.fullName;
    this.cardHolderName = props?.cardHolderName;
    this.cardNumber = props?.cardNumber;
    this.cardExpiry = props?.cardExpiry;
    this.cardCCV = props?.cardCCV;
  }

  validate() {
    try {
      if (!this.amount || this.amount < 0) {
        throw new Error("Invalid amount");
      }

      if (!this.currency) {
        throw new Error("Currency is required");
      } else if (!this.validateCurrency(this.currency)) {
        throw new Error("Invalid curreny option");
      }

      if (!this.fullName) {
        throw new Error("Customer full name is required");
      }

      if (!this.cardHolderName) {
        throw new Error("Customer card holder name is required");
      }

      if (!this.cardNumber) {
        throw new Error("Customer card number is required");
      } else if (!this.validateCreditCard(this.cardNumber)) {
        throw new Error("Invalid card number");
      }

      if (!this.cardExpiry) {
        throw new Error("Customer card expiry is required");
      } else if (!this.validateExpiry(this.cardExpiry)) {
        throw new Error("Invalid card expiry");
      }

      if (!this.cardCCV) {
        throw new Error("Customer card ccv is required");
      } else if (!this.validateCVV(this.cardCCV)) {
        throw new Error("Invalid card ccv");
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  detectPaymentMethod() {
    try {
      const cardType = this.getCreditCardType(this.cardNumber);
      const currency = this.currency.toUpperCase();

      if (cardType === "AMEX") {
        if (currency !== "USD") {
          throw new Error("AMEX is only possible to use for USD");
        }

        return "PAYPAL";
      } else if (["USD", "EUR", "AUD"].includes(currency)) {
        return "PAYPAL";
      } else {
        return "BRAINTREE";
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = RequestValidator;

// const {
//   validateCurrency,
//   validateCreditCard,
//   validateCardExpiry,
//   validateCVV,
//   detectCardType,
// } = require("../utils/validations");

// const validateInput = (req) => {
//   const { amount, currency, fullName, cardHolderName, cardNumber, cardExpiry, cardCCV } = req;

//   try {
//     if (!amount || amount < 0) {
//       throw new Error("Invalid amount");
//     }

//     if (!currency) {
//       throw new Error("Currency is required");
//     } else if (!validateCurrency(currency)) {
//       throw new Error("Invalid curreny option");
//     }

//     if (!fullName) {
//       throw new Error("Customer full name is required");
//     }

//     if (!cardHolderName) {
//       throw new Error("Customer card holder name is required");
//     }

//     if (!cardNumber) {
//       throw new Error("Customer card number is required");
//     } else if (!validateCreditCard(cardNumber)) {
//       throw new Error("Invalid card number");
//     }

//     if (!cardExpiry) {
//       throw new Error("Customer card expiry is required");
//     } else if (!validateCardExpiry(cardExpiry)) {
//       throw new Error("Invalid card expiry");
//     }

//     if (!cardCCV) {
//       throw new Error("Customer card ccv is required");
//     } else if (!validateCVV(cardCCV)) {
//       throw new Error("Invalid card ccv");
//     }
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// const decidePaymentMethod = (currency, cardNumber) => {
//   try {
//     const cardType = detectCardType(cardNumber);
//     currency = currency.toUpperCase();

//     if (cardType === "AMEX") {
//       if (currency !== "USD") {
//         throw new Error("AMEX is only possible to use for USD");
//       }

//       return "PAYPAL";
//     } else if (["USD", "EUR", "AUD"].includes(currency)) {
//       return "PAYPAL";
//     } else {
//       return "BRAINTREE";
//     }
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// module.exports = { validateInput, decidePaymentMethod };
