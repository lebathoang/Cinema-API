const CastRepo = require("../repositories/CastRepository");

exports.getCastByMovieId = async (movieId) => {
  const cast = await CastRepo.getCastByMovieId(movieId);

  return cast;
};