import IUser from "@modules/auth/IUser";
import { CreateUserRepository } from "@database/auth/CreateUserRepository";
import DatabaseConnection from "@database/connect";
import CreateUserService from "./CreateUserService";

describe("User creation tests", () => {
	let db: DatabaseConnection;
	let createUser: CreateUserService;

	beforeAll(async () => {
		db = new DatabaseConnection("usersTest");
		await db.connect();

		const userRepository = new CreateUserRepository("usersTest");
	  createUser = new CreateUserService(userRepository);
	});

	afterAll(async () => {
		await db.destroy();
		await db.disconnect();
	});

	beforeEach( async () => {
		await db.clear();
	});

	it("Create a user", async () => {
		const user: IUser = {
			email: "user@example.com",
			name: "user",
			lastName: "exemple",
			password: "password"
		};
		const createdUser = await createUser.execute(user);

		expect(createdUser.isValid).toBe(false);
	});

	it("Erro on create duplicated user", async () => {
		const user: IUser = {
			email: "user@example.com",
			name: "user",
			lastName: "exemple",
			password: "password"
		};

		try {
			await createUser.execute(user);
			await createUser.execute(user);
		} catch (e) {
			expect(e.message).toBe("User alredy already exists");  
		}
		
	});
});