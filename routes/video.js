import express from "express";
import {
    getVideo,
} from "../controllers/video.js";
import { protect } from "../middleware/auth.js";



const router = express.Router();


router.route("/").get(getVideo);


export default router;