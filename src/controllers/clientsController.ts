import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { Client } from "../models/Client";
import bcrypt from "bcrypt";
import { TokenDecoded } from "../../types";
import { Appointment } from "../models/Appointment";

const register = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const surname = req.body.surname;
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

    const newClient = await Client.create({
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
      message: "Client can't be created",
      error: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Client.findOneBy({
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
      message: "User can not be logged",
      error: error,
    });
  }
};

const profile = async (req: Request, res: Response) => {
  try {
    const user = await Client.findOneBy({
      id: req.token.id,
    });

    return res.json({
      success: true,
      message: "User Profile retrieved",
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

    const updateClient = await Client.update(
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
      message: "User information can not be updated",
      error: error,
    });
  }
};

const getAllAppointmentByClientId = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.find({
      select: {
        id: true,
        artist_id: true,
        status: true,
        date: true,
        artist: {
          name: true,
          surname: true,
          email: true,
          password: false,
        },
      },
      where: {
        client_id: req.token.id,
      },
      relations: {
        artist: true,
      },
    });

    return res.json({
      success: true,
      message: "appointments by user retrieved",
      data: appointment,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "appointments cant by user retrieved",
      error: error,
    });
  }
};

export { register, login, profile, update, getAllAppointmentByClientId };
