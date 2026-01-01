import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createIndex('roles', 'name', { unique: true })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropIndex('roles', 'name', { unique: false })
}
