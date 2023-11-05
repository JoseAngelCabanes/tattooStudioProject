"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
// app.use('/client', routerClients)
// app.use('/artist', routerTatoo_artists)
// app.use('/appointment', routerAppointment)
// app.use('/portfolio', routerPortfolio)
db_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running ${PORT}`);
    });
})
    .catch(error => {
    console.log(error);
});
