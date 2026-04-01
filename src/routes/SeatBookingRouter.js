const router = require("express").Router();
const SeatController = require("../controllers/SeatBookingController");
const auth = require("../middlewares/AuthMiddleware");
const optionalAuth = require("../middlewares/OptionalAuthMiddleware");

router.post("/hold-seats", auth, SeatController.holdSeats);
router.post("/select-seats", auth, SeatController.holdSeats);
router.get("/status/:showTimeId", optionalAuth, SeatController.getSeatStatuses);
router.get("/layout/:showTimeId", optionalAuth, SeatController.getSeatLayout);

module.exports = router;
