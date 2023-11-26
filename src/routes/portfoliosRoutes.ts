import { Router } from "express";
import {
  createImage,
  updateImageById,
  deleteImageByArtistId,
  getAllPortfolio,
} from "../controllers/portfoliosController";
import { auth } from "../middlewares/auth";
import { admin } from "../middlewares/admin";

const router = Router();

router.post("/create", auth, admin, createImage);
router.post("/update/:id", auth, admin, updateImageById);
router.delete("/delete", auth, admin, deleteImageByArtistId);
router.get("/all", getAllPortfolio);

export { router };
