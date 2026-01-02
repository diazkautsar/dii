import express from "express";
import { authMiddleware } from "../middlewares/index.js";
import { addRoleController } from "../controllers/index.js";

const router = express.Router()

router.post("/", authMiddleware, addRoleController)

export { router as roleRouter }