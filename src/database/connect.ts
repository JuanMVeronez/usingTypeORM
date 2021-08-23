import {Connection, createConnection} from "typeorm";

export default class DatabaseConnection {
	private dbName: string;
	database: Connection;

	constructor(dbName: string) { 
		this.dbName = dbName;
	}
	
	async connect(): Promise<Connection> {
		this.database = await createConnection(this.dbName);
		return this.database;
	}

	async disconnect(): Promise<void> {
		return await this.database?.close();
	}

	async destroy(): Promise<void> {
		await this.database?.dropDatabase();
	}

	async clear(): Promise<void> {
		const entities = this.database?.entityMetadatas;

		entities.forEach(async entity => {
			const repo = this.database.getRepository(entity.name);
			await repo.query(`DELETE FROM ${entity.tableName}`);
		});
	}

	get isConnected(): boolean {
		return this.database?.isConnected;
	}
}