import "reflect-metadata";
import { DataSource } from "typeorm";
import { Portfolio } from "./models/Portfolio";
import { Client } from "./models/Client";
import { Artist } from "./models/Artist";
import { Appointment } from "./models/Appointment";
import { CreateTableClients1698340010072 } from "./migration/1698340010072-create-table-clients";
import { CreateTableArtists1698391288374 } from "./migration/1698391288374-create-table-artists";
import { CreateTableAppointments1698391359737 } from "./migration/1698391359737-create-table-appointments";
import { CreateTablePortfolios1698392187453 } from "./migration/1698392187453-create-table-portfolios";
import dotenv from 'dotenv';
dotenv.config();


type database = "mysql";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as database,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Portfolio, Client, Artist, Appointment],
  migrations: [
    CreateTableClients1698340010072,
    CreateTableArtists1698391288374,
    CreateTableAppointments1698391359737,
    CreateTablePortfolios1698392187453,
  ],
  synchronize: false,
  logging: false,
});
