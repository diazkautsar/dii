import { HttpError } from "../helpers/index.js";
import { getMenuBasedOnId, getRoleBaseId, insertMenu } from "../models/index.js";
import type { AddMenuInterface } from "../models/index.js"

export const addMenu = async (dto: AddMenuInterface) => {
  try {
    const {
      parentId,
      roleId,
    } = dto

    if (parentId) {
      const [ parentMenu ] = await getMenuBasedOnId(parentId)
      if (!parentMenu) throw new HttpError(400, "parent menu not found")
    }

    const [ role ] = await getRoleBaseId(roleId)
    if (!role) {
      throw new HttpError(400, "invalid role id")
    }

    await insertMenu(dto)
  } catch (error) {
    throw error
  }
}