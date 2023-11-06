import { Router } from "express";
import {
  register,
  login,
  profile,
  update,
  getAllAppointmentByClientId,
} from "../controllers/clientsController";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", auth, profile);

router.put("/update", auth, update);

router.get("/appointment/:id", auth, getAllAppointmentByClientId);

export { router };
