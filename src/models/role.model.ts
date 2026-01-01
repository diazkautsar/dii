import { pool } from "../config/db.js"

export const getRoleBaseId = async (id: number) => {
  try {
    const text = `
      select
      r.id as "id"
      , r.name as "name"
      from roles r where r.id = $1 and deleted_at is null
    `

    const value = [ id ]

    const result = await pool.query(text, value)

    return result.rows as { id: number, name: string }[]
  } catch (error) {
    throw error
  }
}