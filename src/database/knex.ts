import knex from "knex";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/database.sqlite",
  },
  useNullAsDefault: true,
});

export default db;