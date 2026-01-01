import { pool } from "../config/db.js"

export const getRoleBaseId = async (id: number) => {
  try {
    const result = await pool.query(`
        select
        r.id as "id"
        , r.name as "name"
        from roles r where r.id = ${id} and deleted_at is null
      `)

    return result.rows as { id: number, name: string }[]
  } catch (error) {
    throw error
  }
}