const CinemaRepo = require("../repositories/CinemaRepository");
const { getPagination } = require("../utils/PaginationUtil");

exports.createCinema = async (data) => {
  const { features, ...cinema } = data;

  return await CinemaRepo.createCinema(cinema, features);
};

exports.getAllCinemas = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const rows = await CinemaRepo.getAllCinemas(limit, offset);
  const total = await CinemaRepo.countAllCinemas();

  return {
    data: rows.map((row) => ({
      ...row,
      features: row.features ? row.features.split(",") : [],
    })),
    pagination: {
      page,
      limit,
      total,
    },
  };
};

exports.getCinemaById = async (id) => {
  const row = await CinemaRepo.getCinemaById(id);

  if (!row) return null;

  return {
    ...row,
    features: row.features ? row.features.split(",") : [],
  };
};

exports.searchCinemas = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const keyword = query.keyword || query.search || "";
  const minRating = query.minRating;

  const cinemas = await CinemaRepo.searchCinemas({
    keyword,
    minRating,
    limit,
    offset,
  });

  const total = await CinemaRepo.countSearchCinemas({
    keyword,
    minRating,
  });

  return {
    data: cinemas.map((cinema) => ({
      ...cinema,
      features: cinema.features ? cinema.features.split(",") : [],
    })),
    pagination: {
      page,
      limit,
      total,
    },
  };
};

exports.updateCinema = async (id, data) => {
  const { features, ...cinema } = data;

  await CinemaRepo.updateCinema(id, cinema, features);
};

exports.deleteCinema = async (id) => {
  await CinemaRepo.deleteCinema(id);
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

exports.getCinemaMoviesByDate = async ({ cinemaId, date }) => {
  const normalizedDate = normalizeDate(date);
  const parsedCinemaId = Number(cinemaId);

  if (!Number.isInteger(parsedCinemaId) || parsedCinemaId <= 0) {
    throw new Error("Invalid cinemaId");
  }

  if (!normalizedDate) {
    throw new Error("Invalid date. Use dd/mm/yyyy or yyyy-mm-dd");
  }

  const movies = await CinemaRepo.getCinemaMoviesByDate(
    parsedCinemaId,
    normalizedDate
  );
  const showtimes = await CinemaRepo.getCinemaShowtimesByDate(
    parsedCinemaId,
    normalizedDate
  );

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

  return {
    cinemaId: parsedCinemaId,
    date: normalizedDate,
    totalMovies: movies.length,
    data: movies.map((movie) => ({
      ...movie,
      genres: movie.genres ? movie.genres.split(",") : [],
      showtimes: showtimesByMovieId[movie.id] || [],
    })),
  };
};

exports.getCinemaShowDates = async (cinemaId) => {
  const parsedCinemaId = Number(cinemaId);

  if (!Number.isInteger(parsedCinemaId) || parsedCinemaId <= 0) {
    throw new Error("Invalid cinemaId");
  }

  const dates = await CinemaRepo.getCinemaShowDates(parsedCinemaId);

  return {
    cinemaId: parsedCinemaId,
    totalDates: dates.length,
    data: dates.map((item) => ({
      date: item.show_date,
      totalMovies: Number(item.total_movies),
    })),
  };
};
