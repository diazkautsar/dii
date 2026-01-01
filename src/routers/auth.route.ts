import express from "express";
import { loginController, selectRoleController } from "../controllers/index.js"

const router = express.Router()

router.post("/signin", loginController)
router.post("/signin/role", selectRoleController)

export { router as authRouter }