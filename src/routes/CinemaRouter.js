const router = require("express").Router();

const CinemaRouter = require("../controllers/CinemaController");

router.get("/list-cinemas", CinemaRouter.getAllCinemas);
router.get("/search", CinemaRouter.searchCinemas);
router.get("/show-dates", CinemaRouter.getCinemaShowDates);
router.get("/movie-by-date", CinemaRouter.getCinemaMoviesByDate);


module.exports = router;
