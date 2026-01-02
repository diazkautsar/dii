import { pool } from "../config/db.js"

export const insertMenuRole = async (menuId: number, roleId: number) => {
  try {
    const text = `
      INSERT INTO menu_role(menu_id, role_id)
      VALUES($1, $2)
      RETURNING *
    `
    const value = [ menuId, roleId ]
    const result = await pool.query(text, value)

    return result.rows as { id: number }[]
  } catch (error) {
    throw error
  }
}