import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Artist } from "../models/Artist";
import bcrypt from "bcrypt";
import { TokenDecoded } from "../../types";
import { Appointment } from "../models/Appointment";
import { Client } from "../models/Client";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.body.name;
    const surname = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      return res.json({ mensaje: "The email entered is not valid" });
    }

    const passswordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]{4,12}$/;
    if (!passswordRegex.test(password)) {
      return res.json({ mensaje: "Invalid password" });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const newClient = await Artist.create({
      name: name,
      surname: surname,
      email: email,
      password: encryptedPassword,
    }).save();

    return res.json({
      success: true,
      message: "Client created succesfully",
      token: newClient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Artist can not be created",
      error: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Artist.findOneBy({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "Email or password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      "tatuatge",
      {
        expiresIn: "3h",
      }
    );

    return res.json({
      success: true,
      message: "User logged succesfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cant be logged",
      error: error,
    });
  }
};

const profile = async (req: Request, res: Response) => {
  try {
    const user = await Artist.findOneBy({
      id: req.token.id,
    });

    return res.json({
      success: true,
      message: "User profile retrieved",
      data: user,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "User profile can not be retrieved",
      error: error,
    });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password } = req.body;

    const updateClient = await Artist.update(
      {
        id: req.token.id,
      },
      {
        name: name,
        surname: surname,
        email: email,
        password: password,
      }
    );

    return res.json({
      success: true,
      message: "User updated",
      data: updateClient,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "User information could't be updated",
      error: error,
    });
  }
};

const getAllAppointmentByArtistId = async (req: Request, res: Response) => {
  try {
    const appoimentId = req.params.id;
    const appointment = await Appointment.find({
      where: {
        artist_id: req.token.id,
      },
      select: {
        id: true,
        client_id: true,
        status: true,
        date: true,
        client: {
          name: true,
          surname: true,
          email: true,
          password: false,
        },
      },
      relations: {
        client: true,
      },
    });

    return res.json({
      success: true,
      message: "Artist appointments retrieved",
      data: appointment,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Artist appointments couldn't be retrieved",
      error: error,
    });
  }
};

const getAllArtist = async (req: Request, res: Response) => {
  try {
    const artists = await Artist.find({
      select: {
        name: true,
        surname: true,
        email: true,
      },
    });

    return res.json({
      success: true,
      message: "users retrieved",
      data: artists,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "users can not be retrieved",
      error: error,
    });
  }
};

const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        role: true,
        is_active: true,
        created_at: true,
        updated_at: true,
      },
    });

    return res.json({
      success: true,
      message: "users retrieved",
      data: clients,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "users can not be retrieved",
      error: error,
    });
  }
};

const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { role, is_active } = req.body;

    const updateArtist = await Artist.update(
      {
        id: req.body.id,
      },
      {
        role: role,
        is_active: is_active,
      }
    );

    return res.json({
      success: true,
      message: "User updated",
      data: updateArtist,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "User information can not be updated",
      error: error,
    });
  }
};

const updateAdminClients = async (req: Request, res: Response) => {
  try {
    const { is_active } = req.body;

    const updateClient = await Client.update(
      {
        id: req.body.id,
      },
      {
        is_active: is_active,
      }
    );

    return res.json({
      success: true,
      message: "User updated",
      data: updateClient,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "User information cant by updated",
      error: error,
    });
  }
};

export {
  register,
  login,
  profile,
  update,
  getAllAppointmentByArtistId,
  getAllArtist,
  getAllClients,
  updateAdmin,
  updateAdminClients,
};
