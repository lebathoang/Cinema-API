const CinemaService = require("../services/CinemaService");

exports.createCinema = async (req, res, next) => {
  try {
    const id = await CinemaService.createCinema(req.body);

    res.json({
      success: true,
      message: "Cinema created",
      data: { id },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllCinemas = async (req, res, next) => {
  try {
    const result = await CinemaService.getAllCinemas(req.query);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

exports.searchCinemas = async (req, res, next) => {
  try {
    const result = await CinemaService.searchCinemas(req.query);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCinemaMoviesByDate = async (req, res, next) => {
  try {
    const { cinemaId, date } = req.query;

    if (!cinemaId || !date) {
      return res.status(400).json({
        success: false,
        message: "cinemaId and date are required",
      });
    }

    const result = await CinemaService.getCinemaMoviesByDate({
      cinemaId,
      date,
    });

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    if (
      err.message.includes("Invalid date") ||
      err.message.includes("Invalid cinemaId")
    ) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next(err);
  }
};

exports.getCinemaShowDates = async (req, res, next) => {
  try {
    const { cinemaId } = req.query;

    if (!cinemaId) {
      return res.status(400).json({
        success: false,
        message: "cinemaId is required",
      });
    }

    const result = await CinemaService.getCinemaShowDates(cinemaId);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    if (err.message.includes("Invalid cinemaId")) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    next(err);
  }
};

exports.getCinemaById = async (req, res, next) => {
  try {
    const data = await CinemaService.getCinemaById(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Cinema not found",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCinema = async (req, res, next) => {
  try {
    await CinemaService.updateCinema(req.params.id, req.body);

    res.json({
      success: true,
      message: "Cinema updated",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCinema = async (req, res, next) => {
  try {
    await CinemaService.deleteCinema(req.params.id);

    res.json({
      success: true,
      message: "Cinema deleted",
    });
  } catch (err) {
    next(err);
  }
};
