import { Router } from "express";
import { router as routerClients } from "./routes/clientsRoutes";
import { router as routerArtists } from "./routes/artistsRoutes";
import { router as routerAppointment } from "./routes/appointmentsRoutes";
import { router as routerPortfolios } from "./routes/portfoliosRoutes";

const appRouter = Router();

appRouter.use("/client", routerClients);
appRouter.use("/artist", routerArtists);
appRouter.use("/appointment", routerAppointment);
appRouter.use("/portfolio", routerPortfolios);

export { appRouter };
