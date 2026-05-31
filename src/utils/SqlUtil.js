const toSafeNonNegativeInteger = (value, fallback = 0) => {
  const number = Number(value);

  if (!Number.isSafeInteger(number) || number < 0) {
    return fallback;
  }

  return number;
};

const toSafePositiveInteger = (value, fallback = 50) => {
  const number = Number(value);

  if (!Number.isSafeInteger(number) || number <= 0) {
    return fallback;
  }

  return number;
};

exports.getLimitOffsetClause = (limit, offset) => {
  const safeLimit = toSafePositiveInteger(limit);
  const safeOffset = toSafeNonNegativeInteger(offset);

  return `LIMIT ${safeLimit} OFFSET ${safeOffset}`;
};

exports.getLimitClause = (limit) => {
  const safeLimit = toSafePositiveInteger(limit);

  return `LIMIT ${safeLimit}`;
};
