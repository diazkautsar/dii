import { pool } from "../config/db.js"

export const getUserBasedUsername = async (username: string) => {
  try {
    const result = await pool.query(`
      select * from users u WHERE u.username = '${username}'
    `)

    return result.rows as { id: number, username: string, password: string }[]
  } catch (error) {
    throw error
  }
}

export const getUserBasedOnUserId = async (userId: number) => {
  try {
    const result = await pool.query(`
      select * from users u WHERE u.id = ${userId}
    `)

    return result.rows as { id: number, username: string, first_name: string, last_name: string }[]

  } catch (error) {
    throw error
  }
}