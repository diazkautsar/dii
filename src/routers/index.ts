import express from "express";
import { authRouter } from "./auth.route.js";
import { menuRouter } from "./menu.route.js";
import { roleRouter } from "./role.route.js";
import { userRouter } from "./user.route.js";

const router = express.Router()

router.use("/auth", authRouter)
router.use("/menu", menuRouter)
router.use("/role", roleRouter)
router.use("/user", userRouter)

export { router }