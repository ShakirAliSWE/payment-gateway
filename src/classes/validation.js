class Validations {
  constructor() {}

  validateCurrency(currency) {
    const options = ["USD", "EUR", "THB", "HKD", "SGD", "AUD"];
    return options.includes(currency.toUpperCase());
  }

  validateCreditCard(creditCardNumber) {
    const cardNumber = creditCardNumber.split(" ").join("");
    let sum = 0;
    let isEven = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  validateExpiry(cardExpiry) {
    const [expirationMonth, expirationYear] = cardExpiry.split("/");

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is 0

    if (expirationYear > currentYear) {
      return true;
    } else if (expirationYear === currentYear && expirationMonth >= currentMonth) {
      return true;
    }

    return false;
  }

  validateCVV(cvv) {
    const cvvPattern = /^[0-9]{3,4}$/;
    return cvvPattern.test(cvv);
  }

  getCreditCardType(creditCardNumber) {
    const cardNumber = creditCardNumber.split(" ").join("");
    const patterns = {
      VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
      MASTERCARD: /^5[1-5][0-9]{14}$/,
      AMEX: /^3[47][0-9]{13}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    };

    for (const cardType in patterns) {
      if (patterns[cardType].test(cardNumber)) {
        return cardType;
      }
    }

    return "UNKNOWN";
  }
}

module.exports = Validations;
