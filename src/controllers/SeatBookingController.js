const SeatService = require("../services/SeatBookingService");

exports.holdSeats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await SeatService.holdSeats(req.body, userId);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getSeatStatuses = async (req, res, next) => {
  try {
    const result = await SeatService.getSeatStatuses(
      req.params.showTimeId,
      req.user?.id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getSeatLayout = async (req, res, next) => {
  try {
    const result = await SeatService.getSeatLayout(
      req.params.showTimeId,
      req.user?.id
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};
