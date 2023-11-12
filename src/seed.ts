import { createConnection } from "typeorm";
import { Client } from "./models/Client";
import { Artist } from "./models/Artist";
import { Appointment } from "./models/Appointment";
import { Portfolio } from "./models/Portfolio";

const seed = async () => {
  const connection = await createConnection();

  try {
    // Crear un cliente de prueba
    const newClient = await Client.create({
      name: "NombreCliente",
      surname: "ApellidoCliente",
      email: "cliente@example.com",
      password: "contraseña",
      is_active: true,
      role: "client",
      created_at: new Date(),
      updated_at: new Date(),
    }).save();

    // Crear un artista de prueba
    const newArtist = await Artist.create({
      name: "NombreArtista",
      surname: "ApellidoArtista",
      email: "artista@example.com",
      password: "contraseña",
      role: "artist",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }).save();

    // Crear una cita de prueba
    const newAppointment = await Appointment.create({
      client_id: newClient.id,
      artist_id: newArtist.id,
      status: true,
      date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    }).save();

    // Crear un portafolio de prueba
    const newPortfolio = await Portfolio.create({
      artist_id: newArtist.id,
      image: "ruta/de/la/imagen.jpg",
      created_at: new Date(),
      updated_at: new Date(),
    }).save();

    console.log("Seed complete");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await connection.close();
  }
};

seed();

//ejecutarlo con npm run seed