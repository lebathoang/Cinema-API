const router = require("express").Router();
const PaymentController = require("../controllers/PaymentController");
const auth = require("../middlewares/AuthMiddleware");

router.post("/create", auth, PaymentController.createPayment);
router.post("/confirm", auth, PaymentController.confirmPayment);

module.exports = router;
