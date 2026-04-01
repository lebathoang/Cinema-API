const db = require("../config/db.config");

exports.getRoomById = async (roomId) => {
  const [rows] = await db.execute(
    `
    SELECT id, cinema_id, name, total_seats
    FROM rooms
    WHERE id = ?
    LIMIT 1
    `,
    [roomId]
  );

  return rows[0] || null;
};

exports.getRoomByShowTimeId = async (showTimeId) => {
  const [rows] = await db.execute(
    `
    SELECT r.id, r.cinema_id, r.name, r.total_seats
    FROM showtimes s
    INNER JOIN rooms r ON r.id = s.room_id
    WHERE s.id = ?
    LIMIT 1
    `,
    [showTimeId]
  );

  return rows[0] || null;
};

exports.countSeatsByRoomId = async (roomId) => {
  const [rows] = await db.execute(
    `
    SELECT COUNT(*) AS total
    FROM seats
    WHERE room_id = ?
    `,
    [roomId]
  );

  return Number(rows[0]?.total || 0);
};

exports.insertSeats = async (roomId, seats) => {
  if (!Array.isArray(seats) || seats.length === 0) {
    return;
  }

  const placeholders = seats.map(() => "(?,?,?,?)").join(",");
  const params = seats.flatMap((seat) => [
    roomId,
    seat.seat_row,
    seat.seat_number,
    seat.type,
  ]);

  await db.execute(
    `
    INSERT INTO seats (room_id, seat_row, seat_number, type)
    VALUES ${placeholders}
    `,
    params
  );
};

exports.getSeatsByRoomId = async (roomId) => {
  const [rows] = await db.execute(
    `
    SELECT id, room_id, seat_row, seat_number, type
    FROM seats
    WHERE room_id = ?
    ORDER BY seat_row ASC, seat_number ASC, id ASC
    `,
    [roomId]
  );

  return rows;
};
