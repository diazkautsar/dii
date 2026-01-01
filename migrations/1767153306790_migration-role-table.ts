import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("roles", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    name: {
      type: "varchar(100)",
      notNull: true,
    },
    description: {
      type: "varchar(100)",
      notNull: false
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
  pgm.dropTable("roles")
}
