const RoomRepo = require("../repositories/RoomRepository");

const DEFAULT_COLUMNS = 12;

const inferSeatType = (roomName) => {
  const normalizedName = String(roomName || "").toLowerCase();

  if (normalizedName.includes("couple")) {
    return "couple";
  }

  if (normalizedName.includes("vip")) {
    return "vip";
  }

  return "normal";
};

const buildSeatRows = (room) => {
  const totalSeats = Math.max(Number(room.total_seats) || 0, DEFAULT_COLUMNS);
  const seats = [];
  const seatType = inferSeatType(room.name);

  for (let index = 0; index < totalSeats; index += 1) {
    const rowIndex = Math.floor(index / DEFAULT_COLUMNS);
    const seatNumber = (index % DEFAULT_COLUMNS) + 1;

    seats.push({
      seat_row: String.fromCharCode(65 + rowIndex),
      seat_number: seatNumber,
      type: seatType,
    });
  }

  return seats;
};

exports.ensureRoomSeats = async (roomId) => {
  const room = await RoomRepo.getRoomById(roomId);

  if (!room) {
    throw new Error("Room not found");
  }

  const seatCount = await RoomRepo.countSeatsByRoomId(roomId);

  if (seatCount === 0) {
    await RoomRepo.insertSeats(roomId, buildSeatRows(room));
  }

  return RoomRepo.getSeatsByRoomId(roomId);
};

exports.ensureShowTimeSeats = async (showTimeId) => {
  const room = await RoomRepo.getRoomByShowTimeId(showTimeId);

  if (!room) {
    throw new Error("Showtime not found");
  }

  const seats = await exports.ensureRoomSeats(room.id);

  return {
    room,
    seats,
  };
};
