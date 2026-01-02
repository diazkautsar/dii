import { pool } from "../config/db.js"

export interface AddRoleInterface {
  name: string;
  description: string | null;
}

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

export const insertRole = async (dto: AddRoleInterface) => {
  try {
    const text = `
      INSERT INTO roles(name, description)
      VALUES($1, $2)
      RETURNING *
    `

    const value = [ dto.name, dto.description ]
    const result = await pool.query(text, value)

    return result.rows as { id: number }[]
  } catch (error) {
    throw error
  }
}

export const getRoleBaseMultipleId = async (ids: number[]) => {
  try {
    const text = `
      select
      r.id as "id"
      , r.name as "name"
      from roles r where r.id = ANY($1::int[])
      and deleted_at is null
    `
    const value = [ ids ]
    const result = await pool.query(text, value)

    return result.rows as { id: number, name: string }[]
  } catch (error) {
    throw error
  }
}