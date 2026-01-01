import express from "express";
import { authMiddleware } from "../middlewares/index.js";
import { addMenuController } from "../controllers/index.js";

const router = express.Router()

router.post('/', authMiddleware, addMenuController)

export { router as menuRouter }