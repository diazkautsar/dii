import { pool } from "../config/db.js"

export interface AddUserInterface {
  username: string;
  firstName: string;
  lastName: string | null;
  password: string;
  roleIds: number[];
}

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

export const insertUser = async (dto: AddUserInterface) => {
  try {
    const text = `
      INSERT INTO users(username, first_name, last_name, password)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `

    const value = [ dto.username, dto.firstName, dto.lastName, dto.password ]
    const result = await pool.query(text, value)

    return result.rows as { id: number }[]
  } catch (error) {
    throw error
  }
}