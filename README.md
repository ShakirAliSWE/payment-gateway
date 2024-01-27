This project is like a smart payment middleman, linking up PayPal and Braintree in the background. It smoothly adapts, switching between them depending on the currency and card type.  And the best part? You can effortlessly add more payment options whenever you want.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/ShakirAliSWE/payment-gateway
    ```
2. Navigate to the project directory:
    ```bash
    cd payment-gateway
    ```
3. Set up environment variables:
- Create a `.env` file based on the provided `.env.example`.
- Configure the required environment variables.

4. Install dependencies:
    ```bash
    npm install
    ```
5. Start the application
    ```bash
    npm start
    ```
  
### Run Test Cases
Ensure the reliability of the application by running unit tests:
```bash
npm test
```

## Usage

Visit `http://localhost:3000` in your browser to access the web application.


## Demo

A live demo of the payment gateway is available at [https://payment-gateway.up.railway.app/](https://payment-gateway.up.railway.app/)


| Demo Credentials || 
| :--- | :--- |
| Credit Card Number | `4111111111111111` | 
| Credit Card Expiry | `02/2025` | 
| Credit Card CCV | `999` |
| Paypal Payer Email | `sb-15q47y29411790@personal.example.com` |
| Paypal Payer Password | `2A8}V%b6` |


## Authors

- [@ShakirAliSWE](https://www.github.com/ShakirAliSWE)
