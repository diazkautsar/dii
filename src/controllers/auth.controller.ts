import type { Request, Response, NextFunction } from "express"
import { login, selectRoleLogin } from "../services/index.js"
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

export const selectRoleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body
    if (!body) {
      return next({ status: 400, message: "form invalid. required field" })
    }

    const { roleSelectionToken, selectedRoleId } = body
    if (!roleSelectionToken) {
      return next({ status: 400, message: "roleSelectionToken required" })
    }

    if (!selectedRoleId) {
      return next({ status: 400, message: "selectedRoleId required" })
    }

    const data = await selectRoleLogin({ roleSelectionToken, selectedRoleId })

    const response: ResponseInterface = {
      success: true,
      message: "success",
      data,
    }

    return res.status(201).json(response)
  } catch (error) {
    throw error
  }
}