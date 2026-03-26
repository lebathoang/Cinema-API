const router = require("express").Router();

const CinemaRouter = require("../controllers/CinemaController");

router.get("/list-cinemas", CinemaRouter.getAllCinemas);
router.get("/search", CinemaRouter.searchCinemas);


module.exports = router;
