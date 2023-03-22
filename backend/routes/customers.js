import express from "express";
import { getUser } from "../controllers/customer.js";

const router = express.Router();

router.get("/find/:customerId", getUser)

export default router