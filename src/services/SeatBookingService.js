const SeatRepo = require("../repositories/SeatBookingRepository");
const RoomSeatService = require("./RoomSeatService");

const SEAT_HOLD_MINUTES = 15;

exports.holdSeats = async (data, userId) => {
  const { showTimeId, seatIds } = data;

  if (!showTimeId || !seatIds || seatIds.length === 0) {
    throw new Error("Missing required fields");
  }

  await RoomSeatService.ensureShowTimeSeats(showTimeId);

  await SeatRepo.deleteExpiredSelectedSeats(showTimeId);

  const normalizedSeatIds = [...new Set(seatIds)];
  const existingSeats = await SeatRepo.findConflictingSeats(
    showTimeId,
    normalizedSeatIds,
    userId
  );

  if (existingSeats.length > 0) {
    throw new Error("Some seats already taken");
  }

  const now = new Date();
  const expiresAt = new Date(now.getTime() + SEAT_HOLD_MINUTES * 60 * 1000);

  await SeatRepo.deleteUserSelectedSeats(userId, showTimeId, normalizedSeatIds);

  const bookings = normalizedSeatIds.map((seatId) => ({
    show_time_id: showTimeId,
    seat_id: seatId,
    user_id: userId,
    status: "HOLD",
  }));

  try {
    await SeatRepo.insertSeatBookings(bookings, SEAT_HOLD_MINUTES);
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error("Seats already booked (conflict)");
    }
    throw err;
  }

  return {
    success: true,
    message: "Seats selected successfully",
    expiresAt,
  };
};

exports.getSeatStatuses = async (showTimeId, userId) => {
  if (!showTimeId) {
    throw new Error("Missing showTimeId");
  }

  await RoomSeatService.ensureShowTimeSeats(showTimeId);

  await SeatRepo.deleteExpiredSelectedSeats(showTimeId);

  const seats = await SeatRepo.getSeatStatusesByShowTime(showTimeId, userId);

  return {
    success: true,
    seats,
  };
};

exports.getSeatLayout = async (showTimeId, userId) => {
  if (!showTimeId) {
    throw new Error("Missing showTimeId");
  }

  const { room, seats } = await RoomSeatService.ensureShowTimeSeats(showTimeId);

  await SeatRepo.deleteExpiredSelectedSeats(showTimeId);

  const statuses = await SeatRepo.getSeatStatusesByShowTime(showTimeId, userId);
  const statusesBySeatId = statuses.reduce((accumulator, status) => {
    if (!accumulator[status.seatId]) {
      accumulator[status.seatId] = status;
    }
    return accumulator;
  }, {});

  return {
    success: true,
    room,
    seats: seats.map((seat) => ({
      id: seat.id,
      seat_row: seat.seat_row,
      seat_number: seat.seat_number,
      type: seat.type,
      status: statusesBySeatId[seat.id]?.status || "available",
      expiresAt: statusesBySeatId[seat.id]?.expiresAt || null,
      isMine: statusesBySeatId[seat.id]?.isMine || false,
    })),
  };
};
