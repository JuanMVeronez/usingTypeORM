import DatabaseConnection from "./connect";

test("Can connect with database", async () => {
	const db = new DatabaseConnection("usersRepo");
	
	try {
		await db.connect();
		
		expect(db.isConnected).toBe(true);

		await db.disconnect();
	} catch (e) {
		expect(false).toBe(true);
	}
	
});