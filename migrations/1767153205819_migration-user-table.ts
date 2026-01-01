import type { MigrationBuilder, ColumnDefinitions } from "node-pg-migrate"

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("users", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    username: {
      type: "varchar(100)",
      notNull: true,
    },
    first_name: {
      type: "varchar(100)",
      notNull: true,
    },
    last_name: {
      type: "varchar(100)",
      notNull: false
    },
    password: {
      type: "text",
      notNull: true,
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
  pgm.dropTable("users")
}
