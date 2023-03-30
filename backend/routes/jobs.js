import express from "express";
import { jobadd } from "../controllers/job.js";

const router = express.Router();

router.post("/jobadd", jobadd);

export default router