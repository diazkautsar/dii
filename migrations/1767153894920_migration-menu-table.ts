import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('menu', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    name: {
      type: 'varchar(100)',
      notNull: true,
      unique: true,
    },
    description: {
      type: 'varchar(255)',
      notNull: false,
    },
    parent_id: {
      type: 'integer',
      references: '"menu"',
      onDelete: 'CASCADE',
      notNull: false,
    },
    role_id: {
      type: 'integer',
      notNull: true,
      references: '"roles"',
      onDelete: 'CASCADE',
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("menu")
}
