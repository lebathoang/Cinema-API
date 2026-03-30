const router = require("express").Router();

const OfferRouter = require("../controllers/OfferController");

router.get("/list-offers", OfferRouter.getOffers);

module.exports = router;
