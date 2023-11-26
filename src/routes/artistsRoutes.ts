import { Router } from "express";
import {
  register,
  login,
  profile,
  update,
  getAllAppointmentByArtistId,
  getAllArtist,
  getAllClients,
  updateAdmin,
  updateAdminClients,
  getAllAppointment,
} from "../controllers/artistsController";
import { auth } from "../middlewares/auth";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import { admin } from "../middlewares/admin";

const router = Router();

router.post("/register", auth, isSuperAdmin, register);
router.post("/login", login);
router.get("/profile", auth, admin, profile);
router.put("/update", auth, admin, update);
router.get("/appointment/:id", auth, admin, getAllAppointmentByArtistId);
router.get("/all", auth, getAllArtist);
router.get("/clients", auth, isSuperAdmin, getAllClients);
router.put("/update_admin", auth, isSuperAdmin, updateAdmin);
router.put("/update_admin_client", auth, isSuperAdmin, updateAdminClients);
router.get('/appointment', auth, admin, getAllAppointment)

export { router };
