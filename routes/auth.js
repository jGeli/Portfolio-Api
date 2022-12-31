import express from "express";
import {
    login,
    sendEmail
} from "../controllers/auth.js";


const router = express.Router();

router.route("/login").post(login); //PUBLIC

router.route("/email").post(sendEmail); //PUBLIC

export default router;