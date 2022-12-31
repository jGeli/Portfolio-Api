import express from "express";
import {
    uploadFile
} from "../controllers/content.js";
import upload from "../middleware/upload.js";



const router = express.Router();




router.route("/").post([upload.array('files', 5), uploadFile]);



export default router;