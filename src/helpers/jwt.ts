import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { HttpError } from "./error.js";

interface RoleSelectionTokenInterface {
  userId: number;
  roleIds: number[];
}

interface AccessTokenInterface {
  userId: number;
  firstName: string;
  lastName: string;
  roleId: number;
}

export const generateRoleSelectionToken = (dto: RoleSelectionTokenInterface) => {
  return jwt.sign(
    {
      ...dto
    },
    env.ROLE_SELECTION_SECRET,
    {
      expiresIn: "15m",
    }
  );
}

export const validateRoleSelectionToken = (token: string): RoleSelectionTokenInterface => {
  try {
    const payload = jwt.verify(token, env.ROLE_SELECTION_SECRET) as RoleSelectionTokenInterface

    return payload
  } catch (error) {
    throw new HttpError(401, "role selection token expired or invalid")
  }
}

export const generateAccessToken = (dto: AccessTokenInterface) => {
  return jwt.sign(
    {
      ...dto
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1H"
    }
  )
}

export const validateAccessToken = (token: string): AccessTokenInterface => {
  try {
    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as AccessTokenInterface

    return payload
  } catch (error) {
    throw new HttpError(401, "unauthorized")
  }
}