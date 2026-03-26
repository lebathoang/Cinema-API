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
