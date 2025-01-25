import express from "express";
import { register, login, logout, getUser } from "../controllers/user.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", protectedRoute, getUser);

export default router;