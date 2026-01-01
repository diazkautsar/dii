import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import { env } from "./config/index.js"
import { router } from "./routers/index.js";

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  return res.json({
    status: "success"
  })
})

app.use(router)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)

  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    success: false,
  })
})

app.listen(env.PORT, () => {
  console.log(`Server runing on port: ${env.PORT}`)
})