import {Connection, createConnection} from "typeorm";

export default class DatabaseConnection {
	database: Connection;

	async connect(): Promise<Connection> {
		this.database = await createConnection();
		return this.database;
	}

	async disconnect(): Promise<void> {
		return await this.database.close();	
	}

	get isConnected(): boolean {
		return this.database.isConnected;
	}
}