const router = require("express").Router();

const MovieRouter = require("../controllers/MovieController");
const CastRouter = require("../controllers/CastController");
// const auth = require("../middlewares/AuthMiddleware");

router.get("/list-movies", MovieRouter.getMovies);
router.get("/movie/:id", MovieRouter.getMovieDetail);
router.get("/search", MovieRouter.getSearchMovies);
router.get("/suggest", MovieRouter.getSuggestMovies);
router.get("/random-movies", MovieRouter.getRandomMovies);
router.get("/:movieId/cast", CastRouter.getMovieCast);

// router.post("/create-movie",auth,MovieController.createMovie);

module.exports = router;