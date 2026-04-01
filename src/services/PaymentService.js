const PaymentRepo = require("../repositories/PaymentRepository");
const OrderRepo = require("../repositories/OrderRepository");

exports.createPayment = async (data) => {
  const { orderId, amount, provider = "mock" } = data;

  if (!orderId || !amount) {
    throw new Error("Missing required fields");
  }

  const paymentId = await PaymentRepo.createPayment(orderId, amount, provider);
  const paymentUrl = `http://localhost:3000/api/payment/mock-pay?paymentId=${paymentId}`;

  return {
    success: true,
    paymentId,
    paymentUrl,
  };
};

exports.confirmPayment = async (data, userId) => {
  const { paymentId, orderId, seatIds, transactionCode } = data;

  if (!orderId || !seatIds || seatIds.length === 0) {
    throw new Error("Missing required fields");
  }

  const order = await OrderRepo.getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.user_id !== userId) {
    throw new Error("You cannot confirm this order");
  }

  const normalizedSeatIds = [...new Set(seatIds)];
  const validSeats = await OrderRepo.getValidHeldSeats(
    userId,
    order.show_time_id,
    normalizedSeatIds
  );

  if (validSeats.length !== normalizedSeatIds.length) {
    throw new Error("Seats not valid or expired");
  }

  if (paymentId) {
    const payment = await PaymentRepo.getPaymentById(paymentId);

    if (!payment || payment.order_id !== Number(orderId)) {
      throw new Error("Payment not found");
    }

    await PaymentRepo.updatePaymentStatus(
      paymentId,
      "SUCCESS",
      transactionCode || `TXN_${Date.now()}`
    );
  }

  await OrderRepo.updateSeatsToBooked(
    userId,
    order.show_time_id,
    normalizedSeatIds
  );
  await OrderRepo.updateOrderStatus(orderId, "PAID");

  return {
    success: true,
    message: "Payment confirmed and seats booked successfully",
  };
};
