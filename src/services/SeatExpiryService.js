const SeatRepo = require("../repositories/SeatBookingRepository");

let cleanupInterval = null;

exports.runExpiredSeatCleanup = async () => {
  await SeatRepo.deleteExpiredSelectedSeats();
};

exports.startSeatExpiryCleanup = () => {
  if (cleanupInterval) {
    return cleanupInterval;
  }

  cleanupInterval = setInterval(async () => {
    try {
      await exports.runExpiredSeatCleanup();
    } catch (error) {
      console.error("Seat expiry cleanup failed:", error.message);
    }
  }, 60 * 1000);

  return cleanupInterval;
};
