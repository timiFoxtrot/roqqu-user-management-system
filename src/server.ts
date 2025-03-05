import "reflect-metadata";
import { Request, Response } from "express";
import dotenv from "dotenv";
import app from "./app";
import db from "./database/knex";
import { userRouter } from "./routes/user";
import { addressRouter } from "./routes/address";
import { handleErrors } from "./middlewares/error";
import { postRouter } from "./routes/post";
import fs from "fs";
import path from "path";

dotenv.config();

const dataDir = path.resolve(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

db.raw("select 1+1 as result")
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Database connection failed: ", error);
    process.exit(1);
  });

app.get("/health", (req: Request, res: Response): any => {
  return res.status(200).json({
    status: "status",
    message: "server is up and running",
    data: null,
  });
});

// Routes
app.use("/users", userRouter);
app.use("/addresses", addressRouter);
app.use("/posts", postRouter);

app.use(handleErrors);

app.use((req, res, _next) => {
  res.status(404).json({
    status: "error",
    message: "resource not found",
    path: req.url,
    method: req.method,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
