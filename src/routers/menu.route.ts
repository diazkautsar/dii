import express from "express";
import { authMiddleware } from "../middlewares/index.js";
import { addMenuController, setMenuToRoleController } from "../controllers/index.js";

const router = express.Router()

router.post('/', authMiddleware, addMenuController)
router.post("/set-role", authMiddleware, setMenuToRoleController)

export { router as menuRouter }