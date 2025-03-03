import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app";
import db from "./database/knex";

dotenv.config();

const PORT = process.env.PORT || 3000;

db.raw("select 1+1 as result")
  .then(() => {
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed: ", error);
    process.exit(1);
  });
