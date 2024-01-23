import express from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
import todoRoutes from "./routers/todoRoutes";

import { pool, createTodosTable } from "./dbConfig";

const app = express();
const port = 8080;
app.use(cors())

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
    createTodosTable();
  })
  .catch((err) => console.error("Error connecting to PostgreSQL:", err));

app.use("/todos", todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
