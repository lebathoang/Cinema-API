const db = require("../config/db.config");
const Movie = require("../models/MovieModel");

exports.getCastByMovieId = async (movieId) => {
  const query = `
    SELECT 
      a.id,
      a.name,
      a.original_name,
      a.avatar,
      a.bio,
      a.birthday,
      a.nationality,
      a.gender,
      mc.character_name,
      mc.role_type,
      mc.is_main,
      mc.cast_order
    FROM ${Movie.movie_cast} mc
    JOIN actors a ON mc.actor_id = a.id
    WHERE mc.movie_id = ?
    ORDER BY mc.cast_order ASC
  `;

  const [rows] = await db.execute(query, [movieId]);
  return rows;
};