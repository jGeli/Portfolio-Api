import express from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import contentRouter from "./content.js";
import uploadRouter from "./upload.js";
import profileRouter from "./profile.js";
import videoRouter from "./video.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/contents", contentRouter);
router.use("/upload", uploadRouter)
router.use("/profile", profileRouter);
router.use("/video", videoRouter);

export default router;