import type { Request, Response, NextFunction } from "express";
import { validateAccessToken } from "../helpers/index.js";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers
    const { authorization } = header
    if (!authorization) {
      return next({ status: 401, message: "unauthorized" })
    }

    const split = authorization.split(' ')
    const [ bearer, token ] = split
    if (bearer !== "Bearer") {
      return next({ status: 401, message: "unauthorized" })  
    }

    validateAccessToken(token)

    next()
  } catch (error) {
    return next({ status: 401, message: "unauthorized" })
  }
}