import express from "express";
import { appRouter } from "./router";
import { AppDataSource } from "./db";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(appRouter);
app.use(cors())

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

export { app };
