import { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/database.sqlite",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/database/migrations",
    },
  },
};

export default config;
