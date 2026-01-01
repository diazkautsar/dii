import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateRoleSelectionToken = (userId: number, roleIds: number[]) => {
  return jwt.sign(
    {
      userId,
      roleIds
    },
    env.ROLE_SELECTION_SECRET,
    {
      expiresIn: "15m",
    }
  );
}