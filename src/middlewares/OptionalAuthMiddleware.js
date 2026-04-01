require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.ACTIVATION_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
  } catch (_error) {
    // Keep public routes readable even when the client has a stale token.
  }

  next();
};
