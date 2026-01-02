import { pool } from "../config/index.js";
import { HttpError } from "../helpers/index.js";
import { getMenuBasedOnId, getRoleBaseId, insertMenu, insertMenuRole } from "../models/index.js";
import type { AddMenuInterface } from "../models/index.js"

export const addMenu = async (dto: AddMenuInterface) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

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

    const [ { id: menuId } ] = await insertMenu(dto)

    await insertMenuRole(menuId, roleId)

    await client.query("COMMIT");

  } catch (error) {
    await client.query("ROLLBACK");
    throw error
  } finally {
    client.release()
  }
}

export const setMenuToRole = async (menuId: number, roleId: number) => {
  try {
    const [ role ] = await getRoleBaseId(roleId)
    if (!role) {
      throw new HttpError(400, "invalid role id")
    }

    const [ menu ] = await getMenuBasedOnId(menuId)
    if (!menu) {
      throw new HttpError(400, "invalid menu id")
    }

    await insertMenuRole(menuId, roleId)

  } catch (error) {
    throw error
  }
}