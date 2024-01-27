const express = require("express");
const router = express.Router();

const {
  paymentController,
  paymentExecuteController,
  paymentTestController,
} = require("./../controllers/index");

router.post("/payment", paymentController);
router.get("/payment-execute", paymentExecuteController);
router.post("/payment-test", paymentTestController);

module.exports = router;
