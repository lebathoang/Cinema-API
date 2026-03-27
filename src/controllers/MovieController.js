const MovieService = require("../services/MovieService");

exports.createMovie = async (req, res, next) => {
  try {
    await MovieService.createMovie(req.body);

    res.json({
      success: true,
      message: "Movie created",
    });
  } catch (err) {
    next(err);
  }
};

exports.getMovies = async (req, res, next) => {
  try {
    const result = await MovieService.getMovieList(req.query);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

exports.getRandomMovies = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const movies = await MovieService.getRandomMovies(limit);

    res.json({
      success: true,
      data: movies,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMovieDetail = async (req, res, next) => {
  try {
    const movie = await MovieService.getMovieDetail(req.params.id);

    res.json({
      success: true,
      data: movie,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSearchMovies = async (req, res, next) => {
  try {
    const movies = await MovieService.searchMovies(req.query);

    res.json({
      success: true,
      data: movies,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSuggestMovies = async (req, res, next) => {
  try {
    const { keyword } = req.query;

    const movies = await MovieService.suggestMovies(keyword);

    res.json({
      success: true,
      data: movies,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMoviesByDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "date is required",
      });
    }

    const result = await MovieService.getMoviesByDate(date);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    if (err.message.includes("Invalid date")) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next(err);
  }
};
