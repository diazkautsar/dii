import type { Request, Response, NextFunction } from "express"
import { addUser } from "../services/index.js"
import type { ResponseInterface } from "../interface.js"

export const addUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body
    if (!body) {
      return next({ status: 400, message: "form invalid. required field" })
    }

    const { username, firstName, password, roleIds } = body
    if (!username) {
      return next({ status: 400, message: "username required" })
    }

    if (!firstName) {
      return next({ status: 400, message: "firstName required" })
    }

    if (!password) {
      return next({ status: 400, message: "password required" })
    }

    if (!roleIds || (roleIds && roleIds.length === 0)) {
      return next({ status: 400, message: "roleIds required" })
    }

    const data = await addUser({
      ...body,
      lastName: body?.lastName ?? null,
    })
    
    const response: ResponseInterface = {
      success: true,
      message: "success",
      data,
    }

    return res.status(201).json(response)
  } catch (error) {
    throw next(error)
  }
}