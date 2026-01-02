import type { Request, Response, NextFunction } from "express";
import { addRole } from "../services/index.js";
import type { ResponseInterface } from "../interface.js";

export const addRoleController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body
    if (!body) {
      return next({ status: 400, message: "form invalid. required field" })
    }

    const { name,  description} = body
    if (!name) {
      return next({ status: 400, message: "name required" })
    }

    const data = await addRole({
      name,
      description: description ?? null,
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