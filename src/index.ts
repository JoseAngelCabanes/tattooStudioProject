import express from "express";
import { AppDataSource } from "./db";

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

// app.use('/client', routerCustomers)
// app.use('/artist', routerTatoo_artists)
// app.use('/appointment', routerAppointment)
// app.use('/portfolio', routerPortfolio)

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    
    app.listen(PORT, () => {
      console.log(`Server running ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error)
  })
