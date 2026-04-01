'use strict';

const {
  getInsertStatements,
  getTablesFromInsertStatements,
} = require("../src/utils/sqlDumpLoader");

module.exports = {
  async up(queryInterface) {
    const sequelize = queryInterface.sequelize;
    const insertStatements = getInsertStatements();

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    try {
      for (const statement of insertStatements) {
        await sequelize.query(statement);
      }
    } finally {
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    }
  },

  async down(queryInterface) {
    const sequelize = queryInterface.sequelize;
    const tables = getTablesFromInsertStatements().reverse();

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    try {
      for (const table of tables) {
        await sequelize.query(`TRUNCATE TABLE \`${table}\``);
      }
    } finally {
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    }
  },
};
