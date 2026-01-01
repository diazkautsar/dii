import { pool } from "../config/db.js"

export const getUserBasedUsername = async (username: string) => {
  try {
    const text = `
      select * from users u WHERE u.username = $1
    `
    const value = [ username ]

    const result = await pool.query(text, value)

    return result.rows as { id: number, username: string, password: string }[]
  } catch (error) {
    throw error
  }
}

export const getUserBasedOnUserId = async (userId: number) => {
  try {
    const text = `
      select * from users u WHERE u.id = $1
    `
    const value = [ userId ]

    const result = await pool.query(text, value)

    return result.rows as { id: number, username: string, first_name: string, last_name: string }[]

  } catch (error) {
    throw error
  }
}