import { insertRole, type AddRoleInterface } from "../models/index.js"

export const addRole = async (dto: AddRoleInterface) => {
  try {
    await insertRole(dto)
  } catch (error) {
    throw error
  }
}