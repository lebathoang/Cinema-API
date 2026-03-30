const OfferRepo = require("../repositories/OfferRepository");
const { getPagination } = require("../utils/PaginationUtil");

exports.getOfferList = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const offers = await OfferRepo.getOffers(limit, offset);
  const total = await OfferRepo.countOffers();

  return {
    data: offers,
    pagination: {
      page,
      limit,
      total,
    },
  };
};
