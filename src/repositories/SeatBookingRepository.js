const db = require("../config/db.config");
const SeatBooking = require("../models/SeatBookingModel");

exports.deleteExpiredSelectedSeats = async (showTimeId = null) => {
  const params = [];
  let query = `
    DELETE FROM ${SeatBooking.table}
    WHERE status IN ('SELECTED', 'HOLD')
    AND expires_at IS NOT NULL
    AND expires_at <= NOW()
  `;

  if (showTimeId) {
    query += " AND show_time_id = ?";
    params.push(showTimeId);
  }

  await db.execute(query, params);
};

exports.findConflictingSeats = async (showTimeId, seatIds, userId) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM ${SeatBooking.table}
    WHERE show_time_id = ?
    AND seat_id IN (${seatIds.map(() => "?").join(",")})
    AND (
      status = 'BOOKED'
      OR (user_id <> ? AND status IN ('SELECTED', 'HOLD') AND expires_at > NOW())
    )
    `,
    [showTimeId, ...seatIds, userId]
  );

  return rows;
};

exports.deleteUserSelectedSeats = async (userId, showTimeId, seatIds) => {
  if (!seatIds.length) {
    return;
  }

  await db.execute(
    `
    DELETE FROM ${SeatBooking.table}
    WHERE user_id = ?
    AND show_time_id = ?
    AND seat_id IN (${seatIds.map(() => "?").join(",")})
    AND status IN ('SELECTED', 'HOLD')
    `,
    [userId, showTimeId, ...seatIds]
  );
};

exports.getUserSelectedSeats = async (userId, showTimeId, seatIds) => {
  if (!seatIds.length) {
    return [];
  }

  const [rows] = await db.execute(
    `
    SELECT seat_id
    FROM ${SeatBooking.table}
    WHERE user_id = ?
    AND show_time_id = ?
    AND seat_id IN (${seatIds.map(() => "?").join(",")})
    AND status IN ('SELECTED', 'HOLD')
    AND expires_at > NOW()
    `,
    [userId, showTimeId, ...seatIds]
  );

  return rows.map((row) => row.seat_id);
};

exports.refreshUserSelectedSeats = async (userId, showTimeId, seatIds, holdMinutes) => {
  if (!seatIds.length) {
    return;
  }

  await db.execute(
    `
    UPDATE ${SeatBooking.table}
    SET expires_at = DATE_ADD(NOW(), INTERVAL ? MINUTE)
    WHERE user_id = ?
    AND show_time_id = ?
    AND seat_id IN (${seatIds.map(() => "?").join(",")})
    AND status IN ('SELECTED', 'HOLD')
    AND expires_at > NOW()
    `,
    [holdMinutes, userId, showTimeId, ...seatIds]
  );
};

exports.insertSeatBookings = async (bookings, holdMinutes) => {
  if (!bookings.length) {
    return;
  }

  const values = bookings.map(() => "(?,?,?, ?, DATE_ADD(NOW(), INTERVAL ? MINUTE))").join(",");

  const params = bookings.flatMap((booking) => [
    booking.show_time_id,
    booking.seat_id,
    booking.user_id,
    booking.status,
    holdMinutes,
  ]);

  await db.execute(
    `
    INSERT INTO ${SeatBooking.table}
    (show_time_id, seat_id, user_id, status, expires_at)
    VALUES ${values}
    `,
    params
  );
};

exports.getSeatStatusesByShowTime = async (showTimeId, userId = null) => {
  const [rows] = await db.execute(
    `
    SELECT seat_id, status, user_id, expires_at
    FROM ${SeatBooking.table}
    WHERE show_time_id = ?
    AND (
      status = 'BOOKED'
      OR (status IN ('SELECTED', 'HOLD') AND expires_at > NOW())
    )
    ORDER BY
      seat_id ASC,
      CASE WHEN status = 'BOOKED' THEN 0 ELSE 1 END ASC,
      CASE WHEN user_id = ? THEN 0 ELSE 1 END ASC,
      expires_at DESC
    `,
    [showTimeId, userId || 0]
  );

  const statusesBySeatId = new Map();

  for (const row of rows) {
    if (statusesBySeatId.has(row.seat_id)) {
      continue;
    }

    statusesBySeatId.set(row.seat_id, {
      seatId: row.seat_id,
      status: row.status === "BOOKED" ? "booked" : "selected",
      expiresAt: row.expires_at,
      isMine: userId ? row.user_id === userId : false,
    });
  }

  return Array.from(statusesBySeatId.values());
};
