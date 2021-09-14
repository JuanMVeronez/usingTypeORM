import DatabaseConnection from "@database/connect";
import { CreateUserRepository } from "@database/auth/CreateUserRepository";
import CreateUserService from "@modules/auth/createUser/CreateUserService";
import ValidateUserService from "./ValidateUserService";

import IUser from "@modules/auth/IUser";
import { EntityNotFoundError } from "typeorm";

describe("Should connect with a existing user with a password", () => {
	let db: DatabaseConnection;
	let createUser: CreateUserService;
	let userValidation: ValidateUserService;

	const user: IUser = {
		email: "user@example.com",
		name: "user",
		lastName: "exemple",
		password: "password"
	};

	beforeAll(async () => {
		db = new DatabaseConnection("usersTest");
		await db.connect();

		const userRepository = new CreateUserRepository("usersTest");
	  
		createUser = new CreateUserService(userRepository);
	  userValidation = new ValidateUserService(userRepository);
		
		await createUser.execute(user);
	});

	afterAll(async () => {
		await db.destroy();
		await db.disconnect();
	});

	it("Should find a user by email", async () => {
		const findedUser = await userValidation.findUser(user.email);
		expect(findedUser).toHaveProperty("id");
	});

	it("Should validate the password of the user on give the value", async () => {
		expect(await userValidation.userValid(user, user.password)).toBe(undefined);
	});

	it("Should return a jwt to prove the user validation", async () => {
		const jwt = await userValidation.execute(user.email, user.password) as string; 

		expect(jwt.split(" ")[0]).toBe("Bearer");
	});

	it("Shouldn't find a user with a not saved email", async () => {
		try {
			await userValidation.findUser("notSaved@email.com");
		} catch (error) {
			expect(error).toBeInstanceOf(EntityNotFoundError);
		}
	});

	it("Shouldn't validate a user with invalid password", async () => {
		try {
			await userValidation.userValid(user, "notValidPassword");
		} catch (error) {
			expect(error).toThrowError("Invalid email and password combination provided") ;
		}
	});
});