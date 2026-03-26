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
