import { pool } from "../config/db.js"

interface MenuNodeInterface {
  id: number;
  name: string;
  description?: string | null;
  children: MenuNodeInterface[];
}

interface MenuRowsInterface {
  id: number;
  name: string;
  description?: string | null;
  parent_id?: number | null;
  role_id: number;
}

export interface AddMenuInterface {
  name: string;
  description: string | null;
  parentId: number | null;
  roleId: number;
}

export const getMenuBasedOnRoleId = async (roleId: number) => {
  try {
    const text = `
      select
      id
      , name
      , description
      , parent_id
      , role_id
      from menu
      where
      role_id = $1
      and deleted_at is null
    `
    const value = [ roleId ]
    const fromQuery = await pool.query(text, value)

    const data = fromQuery.rows as MenuRowsInterface[]

    return buildMenuTree(data)
  } catch (error) {
    throw error
  }
}

export const buildMenuTree = (rows: MenuRowsInterface[]): MenuNodeInterface[] => {
  const map = new Map<number, MenuNodeInterface>();
  const roots: MenuNodeInterface[] = [];

  for (const row of rows) {
    map.set(row.id, {
      id: row.id,
      name: row.name,
      description: row.description,
      children: [],
    });
  }

  for (const row of rows) {
    const node = map.get(row.id)!;

    if (row.parent_id) {
      const parent = map.get(row.parent_id);
      if (parent) {
        parent.children.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  return roots;
}

export const getMenuBasedOnId = async (id: number) => {
  try {
    const text = `
    select
      id
      , name
      , description
      , parent_id
      , role_id
      from menu
      where
      id = $1
      and deleted_at is null 
    `
    const value = [ id ]

    const result = await pool.query(text, value)

    return result.rows as MenuRowsInterface[]
  } catch (error) {
    throw error
  }
}

export const insertMenu = async (dto: AddMenuInterface) => {
  try {
    const text = `
    INSERT INTO menu(name, description, parent_id, role_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `
    const value = [ dto.name, dto.description, dto.parentId, dto.roleId ]

    const result = await pool.query(text, value)

    return result.rows
  } catch (error) {
    throw error
  }
}