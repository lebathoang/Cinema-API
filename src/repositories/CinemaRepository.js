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
