const db = require("../config/db.config");
const Movie = require("../models/MovieModel");

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
    SELECT start_time, end_time
    FROM ${Movie.showtimes}
    WHERE movie_id = ?
    `,
    [id],
  );

  return {
    ...movie,
    genres: genres.map((g) => g.name),
    showtimes,
  };
};

exports.getMovies = async (search, limit, offset) => {
  const [rows] = await db.execute(
    `SELECT 
        m.*,
        GROUP_CONCAT(g.name) AS ${Movie.genres}
     FROM (
        SELECT *
        FROM ${Movie.movies}
        WHERE title LIKE ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?
     ) m
     LEFT JOIN ${Movie.movie_genres} mg ON mg.movie_id = m.id
     LEFT JOIN ${Movie.genres} g ON g.id = mg.genre_id
     GROUP BY m.id`,
    [`%${search}%`, limit, offset],
  );

  return rows;
};

exports.getRandomMovies = async (limit = 10) => {
  const [rows] = await db.execute(
    `SELECT 
      m.*,
      GROUP_CONCAT(g.name) AS ${Movie.genres}
    FROM ${Movie.movies} m
    JOIN (
      SELECT id
      FROM ${Movie.movies}
      ORDER BY RAND()
      LIMIT ?
    ) r ON m.id = r.id
    LEFT JOIN ${Movie.movie_genres} mg ON mg.movie_id = m.id
    LEFT JOIN ${Movie.genres} g ON g.id = mg.genre_id
    GROUP BY m.id;`,
    [limit],
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
