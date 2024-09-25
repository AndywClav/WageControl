import express from "express";
import { getLogin } from "../controllers/loginController.js"

const router = express.Router();

router.post("/", getLogin);

export default router;