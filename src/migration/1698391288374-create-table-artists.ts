import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableArtists1698391288374 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "artists",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "20",
          },
          {
            name: "surname",
            type: "varchar",
            length: "20",
          },
          {
            name: "email",
            type: "varchar",
            length: "30",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            length: "250",
          },
          {
            name: "role",
            type: "enum",
            enum: ["user", "admin", "super_admin"],
            default: '"admin"',
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("artists");
  }
}
