import { getRoleBasedOnUserId, getUserBasedUsername } from "../models/index.js";
import { HttpError, comparePassword, generateRoleSelectionToken } from "../helpers/index.js";

interface LoginInterface {
  username: string;
  password: string;
}

export const login = async (dto: LoginInterface) => {
  try {
    const { username, password } = dto
    const user = await getUserBasedUsername(username)

    if (!user || user.length === 0) {
      throw new HttpError(400, "invalid username or password")
    }

    const selectedUser = user[0]
    const userId = selectedUser.id
    const resultComparePassword = await comparePassword(password, selectedUser.password)
    if (!resultComparePassword) {
      throw new HttpError(400, "invalid username or password")
    }

    const roles = await getRoleBasedOnUserId(selectedUser.id)
    const rolesIds = roles.map(item => item.roleId)
    const roleSelectionToken = generateRoleSelectionToken(userId, rolesIds)

    return {
      roles: roles.map(item => ({ value: item.roleId, label: item.roleName })),
      roleSelectionToken,
    }
  } catch (error) {
    throw error
  }
}