import { Knex } from "knex";
import path from "path";

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
      filename: path.resolve(__dirname, "data/database.sqlite"),
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
  },
};

export default config;
