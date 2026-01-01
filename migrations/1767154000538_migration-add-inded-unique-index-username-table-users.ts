import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createIndex('users', 'username', { unique: true });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropIndex("users", "username", { unique: false })
}
