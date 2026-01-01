import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';
import { hashPassword } from "../src/helpers/index"

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  const roleId = 1
  const userId = 1
  const roleName = "admin"
  const userPassword = "Default123$"

  pgm.sql(`
    INSERT INTO roles (id, name)
    VALUES
      (${roleId}, '${roleName}')
    ON CONFLICT (name) DO NOTHING;
  `);


  const password = await hashPassword(userPassword)
  pgm.sql(`
    INSERT INTO users (id, username, first_name, password)
    VALUES
      (${userId}, 'admin', 'admin', '${password}')
    ON CONFLICT (username) DO NOTHING;
  `);

  pgm.sql(`
    INSERT INTO user_role (user_id, role_id)
    VALUES
      (${userId}, ${roleId});
  `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {}
