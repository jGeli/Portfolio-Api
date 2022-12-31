import express from "express";
import {
    getProfileRecords,
    getAllProfiles
} from "../controllers/content.js";
import { protect } from "../middleware/auth.js";



const router = express.Router();

router.route("/:id").get([getProfileRecords]);
router.route("/").get([getAllProfiles]);


export default router;