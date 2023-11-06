import { Router } from "express";
import {
  create,
  updateAppointmentById,
  deleteAppointmentByUserId,
} from "../controllers/appointmentsController";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/create", create);
router.post("/update/:id", auth, updateAppointmentById);
router.delete("/delete", auth, deleteAppointmentByUserId);

export { router };
