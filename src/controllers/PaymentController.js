const PaymentService = require("../services/PaymentService");

exports.createPayment = async (req, res, next) => {
  try {
    const result = await PaymentService.createPayment(req.body);

    res.json(result);
  } catch (err) {
    if (err.message === "Missing required fields") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next(err);
  }
};

exports.confirmPayment = async (req, res, next) => {
  try {
    const result = await PaymentService.confirmPayment(req.body, req.user.id);

    res.json(result);
  } catch (err) {
    if (
      err.message === "Missing required fields" ||
      err.message === "Order not found" ||
      err.message === "You cannot confirm this order" ||
      err.message === "Seats not valid or expired" ||
      err.message === "Payment not found"
    ) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next(err);
  }
};
