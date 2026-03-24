const CastService = require("../services/CastService");

exports.getMovieCast = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const cast = await CastService.getCastByMovieId(movieId);

    res.json({
      success: true,
      data: cast,
    });
  } catch (err) {
    next(err);
  }
};