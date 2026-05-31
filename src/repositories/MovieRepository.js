const db = require("../config/db.config");
const Movie = require("../models/MovieModel");
const { getLimitClause, getLimitOffsetClause } = require("../utils/SqlUtil");

exports.createMovie = async (title, description, poster) => {
  await db.execute(
    `INSERT INTO ${Movie.movies}(title,description,poster)
     VALUES(?,?,?)`,
    [title, description, poster],
  );
};

exports.getMovieById = async (id) => {
  const [[movie]] = await db.execute(
    `SELECT * FROM ${Movie.movies} WHERE id = ?`,
    [id],
  );

  if (!movie) return null;

  // genres
  const [genres] = await db.execute(
    `
    SELECT g.name 
    FROM ${Movie.genres} g
    JOIN ${Movie.movie_genres} mg ON g.id = mg.genre_id
    WHERE mg.movie_id = ?
    `,
    [id],
  );

  // showtimes
  const [showtimes] = await db.execute(
    `
    SELECT
      s.id,
      DATE_FORMAT(s.start_time, '%Y-%m-%d %H:%i:%s') AS start_time,
      DATE_FORMAT(s.end_time, '%Y-%m-%d %H:%i:%s') AS end_time,
      s.price,
      r.id AS room_id,
      r.name AS room_name,
      r.total_seats,
      c.id AS cinema_id,
      c.name AS cinema_name
    FROM ${Movie.showtimes} s
    INNER JOIN rooms r ON r.id = s.room_id
    INNER JOIN cinemas c ON c.id = r.cinema_id
    WHERE s.movie_id = ?
      AND s.start_time IS NOT NULL
    ORDER BY s.start_time ASC, s.id ASC
    `,
    [id],
  );

  return {
    ...movie,
    genres: genres.map((g) => g.name),
    showtimes: showtimes.map((showtime) => ({
      id: showtime.id,
      start_time: showtime.start_time,
      end_time: showtime.end_time,
      price: showtime.price,
      room: {
        id: showtime.room_id,
        name: showtime.room_name,
        total_seats: showtime.total_seats,
      },
      cinema: {
        id: showtime.cinema_id,
        name: showtime.cinema_name,
      },
    })),
  };
};

exports.getMovies = async (search, limit, offset) => {
  const limitOffsetClause = getLimitOffsetClause(limit, offset);

  const [rows] = await db.execute(
    `SELECT 
        m.*,
        GROUP_CONCAT(g.name) AS ${Movie.genres}
     FROM (
        SELECT *
        FROM ${Movie.movies}
        WHERE title LIKE ?
        ORDER BY id DESC
        ${limitOffsetClause}
     ) m
     LEFT JOIN ${Movie.movie_genres} mg ON mg.movie_id = m.id
     LEFT JOIN ${Movie.genres} g ON g.id = mg.genre_id
     GROUP BY m.id`,
    [`%${search}%`],
  );

  return rows;
};

exports.getRandomMovies = async (limit = 10) => {
  const limitClause = getLimitClause(limit);

  const [rows] = await db.execute(
    `SELECT 
      m.*,
      GROUP_CONCAT(g.name) AS ${Movie.genres}
    FROM ${Movie.movies} m
    JOIN (
      SELECT id
      FROM ${Movie.movies}
      ORDER BY RAND()
      ${limitClause}
    ) r ON m.id = r.id
    LEFT JOIN ${Movie.movie_genres} mg ON mg.movie_id = m.id
    LEFT JOIN ${Movie.genres} g ON g.id = mg.genre_id
    GROUP BY m.id;`,
  );

  return rows;
};

exports.countMovies = async (search) => {
  const [rows] = await db.execute(
    `SELECT COUNT(*) total
     FROM ${Movie.movies}
     WHERE title LIKE ?`,
    [`%${search}%`],
  );

  return rows[0].total;
};

exports.deleteMovie = async (id) => {
  const [result] = await db.execute(`DELETE FROM ${Movie.movies} WHERE id=?`, [
    id,
  ]);

  return result.affectedRows;
};

exports.searchMovies = async (keyword) => {
  const query = `
    SELECT 
      m.*,
      GROUP_CONCAT(g.name) AS ${Movie.genres}
    FROM ${Movie.movies} m
      LEFT JOIN ${Movie.movie_genres} mg ON m.id = mg.movie_id 
      LEFT JOIN ${Movie.genres} g ON mg.genre_id = g.id
    WHERE m.id IN (
      SELECT m2.id
      FROM ${Movie.movies} m2
        LEFT JOIN ${Movie.movie_genres} mg2 ON m2.id = mg2.movie_id
        LEFT JOIN ${Movie.genres} g2 ON mg2.genre_id = g2.id
      WHERE 
        LOWER(m2.title) LIKE LOWER(?)
        OR LOWER(g2.name) LIKE LOWER(?)
      )
    GROUP BY m.id
    `;

  const [rows] = await db.execute(query, [`%${keyword}%`, `%${keyword}%`]);

  return rows.map((row) => ({
    ...row,
    genres: row.genres ? row.genres.split(",") : [],
  }));
};

exports.suggestMovies = async (keyword) => {
  const query = `
    SELECT 
      m.*,
      GROUP_CONCAT(g.name) AS ${Movie.genres}
    FROM ${Movie.movies} m
      LEFT JOIN ${Movie.movie_genres} mg ON m.id = mg.movie_id 
      LEFT JOIN ${Movie.genres} g ON mg.genre_id = g.id
    WHERE m.id IN (
      SELECT m2.id
      FROM ${Movie.movies} m2
        LEFT JOIN ${Movie.movie_genres} mg2 ON m2.id = mg2.movie_id
        LEFT JOIN ${Movie.genres} g2 ON mg2.genre_id = g2.id
      WHERE 
        LOWER(m2.title) LIKE LOWER(?)
        OR LOWER(g2.name) LIKE LOWER(?)
      )
    GROUP BY m.id
    LIMIT 10
  `;

  const [rows] = await db.execute(query, [`%${keyword}%`, `%${keyword}%`]);

  return rows.map((row) => ({
    ...row,
    genres: row.genres ? row.genres.split(",") : [],
  }));
};

exports.getMoviesByDate = async (date) => {
  const query = `
    SELECT
      m.*,
      GROUP_CONCAT(DISTINCT g.name) AS ${Movie.genres}
    FROM ${Movie.movies} m
    INNER JOIN ${Movie.showtimes} s ON s.movie_id = m.id
    LEFT JOIN ${Movie.movie_genres} mg ON mg.movie_id = m.id
    LEFT JOIN ${Movie.genres} g ON g.id = mg.genre_id
    WHERE DATE(s.start_time) = ?
    GROUP BY m.id
    ORDER BY MIN(s.start_time) ASC, m.id ASC
  `;

  const [rows] = await db.execute(query, [date]);
  return rows;
};

exports.getShowtimesByDate = async (date) => {
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
    FROM ${Movie.showtimes} s
    INNER JOIN rooms r ON r.id = s.room_id
    INNER JOIN cinemas c ON c.id = r.cinema_id
    WHERE DATE(s.start_time) = ?
    ORDER BY s.start_time ASC, s.id ASC
  `;

  const [rows] = await db.execute(query, [date]);
  return rows;
};
