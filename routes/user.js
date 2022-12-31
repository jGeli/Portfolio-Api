import express from "express";
import {
    register,
    login,
    getMe,
    updateProfile
} from "../controllers/user.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/profile/me", protect, updateProfile);


export default router;