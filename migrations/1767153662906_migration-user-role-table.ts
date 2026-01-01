import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("user_role", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    role_id: {
      type: 'integer',
      notNull: true,
      references: '"roles"',
      onDelete: 'CASCADE',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: false,
    },
    deleted_at: {
      type: 'timestamp',
      notNull: false,
    }
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("user_role")
}
