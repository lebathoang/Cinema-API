const OfferService = require("../services/OfferService");

exports.getOffers = async (req, res, next) => {
  try {
    const result = await OfferService.getOfferList(req.query);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};
