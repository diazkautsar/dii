import { getMenuBasedOnRoleId, getRoleBasedOnUserId, getRoleBaseId, getUserBasedOnUserId, getUserBasedUsername } from "../models/index.js";
import { HttpError, comparePassword, generateAccessToken, generateRoleSelectionToken, validateRoleSelectionToken } from "../helpers/index.js";

interface LoginInterface {
  username: string;
  password: string;
}

interface SubmitRoleLoginInterface {
  roleSelectionToken: string;
  selectedRoleId: number
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
    const roleIds = roles.map(item => item.roleId)
    const roleSelectionToken = generateRoleSelectionToken({ userId, roleIds })

    return {
      roles: roles.map(item => ({ value: item.roleId, label: item.roleName })),
      roleSelectionToken,
    }
  } catch (error) {
    throw error
  }
}

export const selectRoleLogin = async (dto: SubmitRoleLoginInterface) => {
  try {
    const { roleSelectionToken, selectedRoleId } = dto

    const data = validateRoleSelectionToken(roleSelectionToken)
    if (!data.roleIds.includes(selectedRoleId)) {
      throw new HttpError(400, "role not found")
    }

    const [ role ] = await getRoleBaseId(selectedRoleId)
    if (!role) {
      throw new HttpError(400, "role not found")
    }

    const menu = await getMenuBasedOnRoleId(role.id)
    const [ user ] = await getUserBasedOnUserId(data.userId)
    if (!user) {
      throw new HttpError(400, "Role selection token expired or invalid")
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      roleId: selectedRoleId
    })

    return {
      accessToken,
      menu
    }
  } catch (error) {
    throw error
  }
}