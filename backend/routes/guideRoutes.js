import express from "express";
import { getGuideInfo } from "../controllers/guideController.js";

const router = express.Router();
router.post("/", getGuideInfo);

export default router;
