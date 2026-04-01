'use strict';

require('dotenv').config();

const baseConfig = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'db_cinema',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'mysql',
  logging: false,
  timezone: '+00:00',
};

module.exports = {
  development: baseConfig,
  test: {
    ...baseConfig,
    database: process.env.DB_NAME_TEST || baseConfig.database,
  },
  production: baseConfig,
};
