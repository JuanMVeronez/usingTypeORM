import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class creatingUsersTable1629471141215 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "users",
			columns: [
				{
					name: "id",
					type: "varchar(255)",
					isPrimary: true
				},
				{
					name: "email",
					type: "varchar(255)",
					isUnique: true
				},
				{
					name: "password",
					type: "varchar(255)",
				},
				{
					name: "name",
					type: "varchar(255)",
				},
				{
					name: "last_name",
					type: "varchar(255)",
				},
				{
					name: "is_valid",
					type: "bool",
				}
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}
}
