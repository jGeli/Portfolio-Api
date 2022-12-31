import express from "express";
import {
    createRecord,
    getRecordById,
    getAllRecords,
    updateRecordById,
    deleteRecordById,
    getProfileRecords,
    createRecordBulk
} from "../controllers/content.js";
import { protect } from "../middleware/auth.js";



const router = express.Router();

router.route("/bulk/:id").post([protect, createRecordBulk]);
router.route("/:id").post([protect, createRecord]);

router.route("/all").get([protect, getAllRecords]);


router.route("/:id").put([protect, updateRecordById]);
router.route("/:id").delete([protect, deleteRecordById]);
router.route("/:id").get([protect, getRecordById]);


export default router;