const MovieRepo = require("../repositories/MovieRepository");
const { getPagination } = require("../utils/PaginationUtil");

exports.createMovie = async (data) => {
  const { title, description, poster } = data;

  await MovieRepo.createMovie(title, description, poster);
};

exports.getMovieList = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const search = query.search || "";

  const movies = await MovieRepo.getMovies(search, limit, offset);

  const formattedMovies = movies.map((movie) => ({
    ...movie,
    genres: movie.genres ? movie.genres.split(",") : [],
  }));

  const total = await MovieRepo.countMovies(search);

  return {
    data: formattedMovies,
    pagination: {
      page,
      limit,
      total,
    },
  };
};

exports.getMovieDetail = async (id) => {
  const movie = await MovieRepo.getMovieById(id);

  if (!movie) {
    throw new Error("Movie not found");
  }

  return movie;
};

exports.getRandomMovies = async (limit) => {
  const movies = await MovieRepo.getRandomMovies(limit);

  const formattedMovies = movies.map((movie) => ({
    ...movie,
    genres: movie.genres ? movie.genres.split(",") : [],
  }));

  return formattedMovies
};

exports.deleteMovie = async (id) => {
  const affected = await MovieRepo.deleteMovie(id);

  if (affected === 0) {
    throw new Error("Movie not found");
  }
};

exports.searchMovies = async (query) => {
  const { keyword } = query;

  return await MovieRepo.searchMovies(keyword);
};

exports.suggestMovies = async (keyword) => {
  if (!keyword || keyword.trim() === "") return [];

  return await MovieRepo.suggestMovies(keyword);
};

const normalizeDate = (input) => {
  if (!input || typeof input !== "string") {
    return null;
  }

  const value = input.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
};

exports.getMoviesByDate = async (dateInput) => {
  const date = normalizeDate(dateInput);

  if (!date) {
    throw new Error("Invalid date. Use dd/mm/yyyy or yyyy-mm-dd");
  }

  const movies = await MovieRepo.getMoviesByDate(date);
  const showtimes = await MovieRepo.getShowtimesByDate(date);

  const showtimesByMovieId = showtimes.reduce((acc, showtime) => {
    if (!acc[showtime.movie_id]) {
      acc[showtime.movie_id] = [];
    }

    acc[showtime.movie_id].push({
      id: showtime.id,
      start_time: showtime.start_time,
      end_time: showtime.end_time,
      price: showtime.price,
      room: {
        id: showtime.room_id,
        name: showtime.room_name,
      },
      cinema: {
        id: showtime.cinema_id,
        name: showtime.cinema_name,
      },
    });

    return acc;
  }, {});

  const formattedMovies = movies.map((movie) => ({
    ...movie,
    genres: movie.genres ? movie.genres.split(",") : [],
    showtimes: showtimesByMovieId[movie.id] || [],
  }));

  return {
    date,
    totalMovies: formattedMovies.length,
    data: formattedMovies,
  };
};
