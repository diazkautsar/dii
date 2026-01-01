import { pool } from "../config/db.js"

export const getRoleBasedOnUserId = async (userId: number) => {
  try {
    const result = await pool.query(`
      select
      ur.id as "userRoleId"
      , u.id as "userId"
      , r.id as "roleId"
      , r.name as "roleName"
      from user_role ur
      left join users u on u.id = ur.user_id 
      left join roles r on r.id = ur.role_id
      where ur.user_id = ${userId}  
    `)

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