import { pool } from "../config/index.js";
import { hashPassword, HttpError } from "../helpers/index.js";
import { getRoleBaseMultipleId, insertMultipleRoleForOneUser, insertUser, type AddUserInterface } from "../models/index.js"

export const addUser = async (dto: AddUserInterface) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { roleIds } = dto
    const roles = await getRoleBaseMultipleId(roleIds)
    for (const roleId of roleIds) {
      const find = roles.find(i => i.id === roleId)
      if (!find) {
        throw new HttpError(400, `role id ${roleId} not found`)
      }
    }

    const password = await hashPassword(dto.password)
    const [ { id: userId } ] = await insertUser({
      ...dto,
      password,
    })

    await insertMultipleRoleForOneUser(userId, roleIds)

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error
  } finally {
    client.release()
  }
}