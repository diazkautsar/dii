import type { Request, Response, NextFunction } from "express"
import { addMenu } from "../services/index.js"
import type { ResponseInterface } from "../interface.js"

export const addMenuController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body
    if (!body) {
      return next({ status: 400, message: "form invalid. required field" })
    }

    const { name, roleId } = body
    if (!name) {
      return next({ status: 400, message: "name required" })
    }

    if (!roleId) {
      return next({ status: 400, message: "roleId required" })
    }

    const data = await addMenu({
      name,
      roleId,
      description: body?.description ?? null,
      parentId: body?.parentId ?? null,
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