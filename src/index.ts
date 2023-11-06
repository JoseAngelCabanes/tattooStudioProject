import express from "express";
import { router as routerClients } from "./routes/clientsRoutes";
import { router as routerArtists } from "./routes/artistsRoutes";
import { router as routerAppointment } from "./routes/appointmentsRoutes";
import { router as routerPortfolios } from "./routes/portfoliosRoutes";
import { AppDataSource } from "./db";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/client", routerClients);
app.use("/artist", routerArtists);
app.use("/appointment", routerAppointment);
app.use("/portfolio", routerPortfolios);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
