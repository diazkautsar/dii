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

export const getMenuBasedOnRoleId = async (roleId: number) => {
  try {
    const fromQuery = await pool.query(`
      select
      id
      , name
      , description
      , parent_id
      , role_id
      from menu
      where
      role_id = ${roleId}
      and deleted_at is null  
    `)

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