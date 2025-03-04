import { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/database.sqlite",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: "./data/database.sqlite",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "../dist/database/migrations",
    },
  },
};

export default config;
