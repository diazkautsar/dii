import type { Request, Response, NextFunction } from "express"
import { login } from "../services/auth.service.js"
import type { ResponseInterface } from "../interface.js"

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body
    if (!body) {
      return next({ status: 400, message: "username and password required" })
    }

    const { username, password } = body
    if (!username) {
      return next({ status: 400, message: "username required" })
    }

    if (!password) {
      return next({ status: 400, message: "password required" })
    }

    const data = await login({ username, password })

    const response: ResponseInterface = {
      success: true,
      message: "success",
      data,
    }

    return res.status(201).json(response)
  } catch (error) {
    return next(error)
  }
}