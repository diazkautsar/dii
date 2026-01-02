import express from "express";
import { authMiddleware } from "../middlewares/index.js";
import { addUserController } from "../controllers/index.js";

const router = express.Router()

router.post('/', authMiddleware, addUserController)

export { router as userRouter }
