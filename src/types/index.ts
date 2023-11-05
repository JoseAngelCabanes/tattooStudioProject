import express from "express";
import 'dotenv/config'

import { router } from "../routes/usersRoutes";
import { AppDataSource } from "./db";

const app = express()

const PORT = process.env.PORT || 4000

//middleware

app.use(express.json())

app.use('/users', router)

AppDataSource.initialize()
.then(() => {
 console.log('Database connected');
})
.catch(error => {
 console.log(error)
})

app.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
})