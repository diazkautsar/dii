import { pool } from "../config/db.js"

export const getRoleBasedOnUserId = async (userId: number) => {
  try {
    const text = `
      select
      ur.id as "userRoleId"
      , u.id as "userId"
      , r.id as "roleId"
      , r.name as "roleName"
      from user_role ur
      left join users u on u.id = ur.user_id 
      left join roles r on r.id = ur.role_id
      where ur.user_id = $1
      and r.deleted_at is null
    `

    const value = [ userId ]

    const result = await pool.query(text, value)

    return result.rows as {
      userRoleId: number;
      userId: number;
      roleId: number;
      roleName: string;
    }[]
  } catch (error) {
    throw error
  }
}

export const insertMultipleRoleForOneUser = async (userId: number, roleIds: number[]) => {
  try {
    const text = `
      INSERT INTO user_role (user_id, role_id)
      SELECT $1, UNNEST($2::int[])
      RETURNING *
    `
    const value = [ userId, roleIds ]
    const result = await pool.query(text, value)

    return result.rows as { id: number }[]

  } catch (error) {
    throw error
  }
}