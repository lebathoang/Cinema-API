const db = require("../config/db.config");
const Cinema = require("../models/CinemaModel");

exports.createCinema = async (cinema, featureIds) => {
  const { name, location, rating, image } = cinema;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      `INSERT INTO ${Cinema.cinema} (name, location, rating, image)
       VALUES (?, ?, ?, ?)`,
      [name, location, rating || 0, image]
    );

    const cinemaId = result.insertId;

    if (featureIds && featureIds.length > 0) {
      const values = featureIds.map((fid) => [cinemaId, fid]);

      await conn.query(
        `INSERT INTO ${Cinema.cinema_feature} (cinema_id, feature_id)
         VALUES ?`,
        [values]
      );
    }

    await conn.commit();
    return cinemaId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

// GET ALL
exports.getAllCinemas = async (limit, offset) => {
  const query = `
    SELECT 
      c.id,
      c.name,
      c.location,
      c.rating,
      c.image,
      GROUP_CONCAT(f.name) AS ${Cinema.feature}
    FROM cinemas c
    LEFT JOIN ${Cinema.cinema_feature} cf ON c.id = cf.cinema_id
    LEFT JOIN ${Cinema.feature} f ON cf.feature_id = f.id
    GROUP BY c.id
    ORDER BY c.id DESC
    LIMIT ? OFFSET ?
  `;

  const [rows] = await db.execute(query, [limit, offset]);
  return rows;
};

exports.countAllCinemas = async () => {
  const query = `
    SELECT COUNT(*) AS total
    FROM ${Cinema.cinema}
  `;

  const [rows] = await db.execute(query);
  return rows[0].total;
};

exports.searchCinemas = async ({ keyword = "", minRating, limit, offset }) => {
  const conditions = [];
  const params = [];

  if (keyword.trim()) {
    conditions.push("(c.name LIKE ? OR c.location LIKE ?)");
    params.push(`%${keyword}%`, `%${keyword}%`);
  }

  if (minRating !== undefined && minRating !== null && minRating !== "") {
    conditions.push("c.rating >= ?");
    params.push(Number(minRating));
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const query = `
    SELECT
      c.id,
      c.name,
      c.location,
      c.rating,
      c.image,
      GROUP_CONCAT(f.name) AS ${Cinema.feature}
    FROM ${Cinema.cinema} c
    LEFT JOIN ${Cinema.cinema_feature} cf ON c.id = cf.cinema_id
    LEFT JOIN ${Cinema.feature} f ON cf.feature_id = f.id
    ${whereClause}
    GROUP BY c.id
    ORDER BY c.rating DESC, c.name ASC
    LIMIT ? OFFSET ?
  `;

  const [rows] = await db.execute(query, [...params, limit, offset]);
  return rows;
};

exports.countSearchCinemas = async ({ keyword = "", minRating }) => {
  const conditions = [];
  const params = [];

  if (keyword.trim()) {
    conditions.push("(name LIKE ? OR location LIKE ?)");
    params.push(`%${keyword}%`, `%${keyword}%`);
  }

  if (minRating !== undefined && minRating !== null && minRating !== "") {
    conditions.push("rating >= ?");
    params.push(Number(minRating));
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const query = `
    SELECT COUNT(*) AS total
    FROM ${Cinema.cinema}
    ${whereClause}
  `;

  const [rows] = await db.execute(query, params);
  return rows[0].total;
};

// GET BY ID
exports.getCinemaById = async (id) => {
  const query = `
    SELECT 
      c.id,
      c.name,
      c.location,
      c.rating,
      c.image,
      GROUP_CONCAT(f.name) AS ${Cinema.feature}
    FROM ${Cinema.cinema} c
    LEFT JOIN ${Cinema.cinema_feature} cf ON c.id = cf.cinema_id
    LEFT JOIN ${Cinema.feature} f ON cf.feature_id = f.id
    WHERE c.id = ?
    GROUP BY c.id
  `;

  const [rows] = await db.execute(query, [id]);
  return rows[0];
};

// UPDATE
exports.updateCinema = async (id, cinema, featureIds) => {
  const { name, location, rating, image } = cinema;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    await conn.execute(
      `UPDATE ${Cinema.cinema}
       SET name = ?, location = ?, rating = ?, image = ?
       WHERE id = ?`,
      [name, location, rating, image, id]
    );

    // reset features
    await conn.execute(`DELETE FROM ${Cinema.cinema_feature} WHERE cinema_id = ?`, [id]);

    if (featureIds && featureIds.length > 0) {
      const values = featureIds.map((fid) => [id, fid]);

      await conn.query(
        `INSERT INTO ${Cinema.cinema_feature} (cinema_id, feature_id)
         VALUES ?`,
        [values]
      );
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

// DELETE
exports.deleteCinema = async (id) => {
  await db.execute(`DELETE FROM ${Cinema.cinema} WHERE id = ?`, [id]);
};

exports.getCinemaMoviesByDate = async (cinemaId, date) => {
  const query = `
    SELECT
      m.*,
      GROUP_CONCAT(DISTINCT g.name) AS genres
    FROM movies m
    INNER JOIN showtimes s ON s.movie_id = m.id
    INNER JOIN rooms r ON r.id = s.room_id
    LEFT JOIN movie_genres mg ON mg.movie_id = m.id
    LEFT JOIN genres g ON g.id = mg.genre_id
    WHERE r.cinema_id = ? AND DATE(s.start_time) = ?
    GROUP BY m.id
    ORDER BY MIN(s.start_time) ASC, m.id ASC
  `;

  const [rows] = await db.execute(query, [cinemaId, date]);
  return rows;
};

exports.getCinemaShowtimesByDate = async (cinemaId, date) => {
  const query = `
    SELECT
      s.id,
      s.movie_id,
      DATE_FORMAT(s.start_time, '%Y-%m-%d %H:%i:%s') AS start_time,
      DATE_FORMAT(s.end_time, '%Y-%m-%d %H:%i:%s') AS end_time,
      s.price,
      r.id AS room_id,
      r.name AS room_name,
      c.id AS cinema_id,
      c.name AS cinema_name
    FROM showtimes s
    INNER JOIN rooms r ON r.id = s.room_id
    INNER JOIN cinemas c ON c.id = r.cinema_id
    WHERE c.id = ? AND DATE(s.start_time) = ?
    ORDER BY s.start_time ASC, s.id ASC
  `;

  const [rows] = await db.execute(query, [cinemaId, date]);
  return rows;
};

exports.getCinemaShowDates = async (cinemaId) => {
  const query = `
    SELECT
      DATE_FORMAT(DATE(s.start_time), '%Y-%m-%d') AS show_date,
      COUNT(DISTINCT s.movie_id) AS total_movies
    FROM showtimes s
    INNER JOIN rooms r ON r.id = s.room_id
    WHERE r.cinema_id = ?
    GROUP BY DATE(s.start_time)
    ORDER BY DATE(s.start_time) ASC
  `;

  const [rows] = await db.execute(query, [cinemaId]);
  return rows;
};
