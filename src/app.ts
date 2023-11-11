import express from "express";
import { appRouter } from "./router";
import { AppDataSource } from "./db";

const app = express();

app.use(express.json());
app.use(appRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

export { app };
