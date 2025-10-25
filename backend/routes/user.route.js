import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
  getUserSummary,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getCurrentUser);
router.get("/summary", authMiddleware, getUserSummary);

export default router;
