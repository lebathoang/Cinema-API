const fs = require("fs");
const path = require("path");

const SQL_DUMP_PATH = path.resolve(__dirname, "..", "..", "db_cinema.sql");

const stripComments = (sql) =>
  sql
    .split(/\r?\n/)
    .filter((line) => {
      const trimmed = line.trim();
      return (
        trimmed !== "" &&
        !trimmed.startsWith("--") &&
        !trimmed.startsWith("/*!") &&
        !trimmed.startsWith("*/")
      );
    })
    .join("\n");

const splitStatements = (sql) =>
  stripComments(sql)
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

const getDumpStatements = () =>
  splitStatements(fs.readFileSync(SQL_DUMP_PATH, "utf8"));

exports.getSchemaStatements = () =>
  getDumpStatements().filter(
    (statement) =>
      /^CREATE TABLE/i.test(statement) || /^ALTER TABLE/i.test(statement)
  );

exports.getInsertStatements = () =>
  getDumpStatements().filter((statement) => /^INSERT INTO/i.test(statement));

exports.getTablesFromCreateStatements = () =>
  exports
    .getSchemaStatements()
    .filter((statement) => /^CREATE TABLE/i.test(statement))
    .map((statement) => {
      const match = statement.match(/^CREATE TABLE\s+`?([a-zA-Z0-9_]+)`?/i);
      return match ? match[1] : null;
    })
    .filter(Boolean);

exports.getTablesFromInsertStatements = () => {
  const tableNames = [];

  for (const statement of exports.getInsertStatements()) {
    const match = statement.match(/^INSERT INTO\s+`?([a-zA-Z0-9_]+)`?/i);
    const tableName = match ? match[1] : null;

    if (tableName && !tableNames.includes(tableName)) {
      tableNames.push(tableName);
    }
  }

  return tableNames;
};
