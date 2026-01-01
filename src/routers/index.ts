import express from "express";
import { authRouter } from "./auth.route.js";
import { menuRouter } from "./menu.route.js";

const router = express.Router()

router.use("/auth", authRouter)
router.use("/menu", menuRouter)

export { router }