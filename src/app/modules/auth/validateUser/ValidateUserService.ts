import jsonwebtoken from "jsonwebtoken"; 

import { ICreateUserRepository } from "@database/auth/CreateUserRepository";
import IUser from "@modules/auth/IUser";

export default class ValidateUserService {

	constructor(private userRepository: ICreateUserRepository) { }

	async execute(email: string, password: string): Promise<string | void> {
		try {
			const user = await this.findUser(email);
			
			await this.userValid(user, password);
			
			const jwt = jsonwebtoken.sign({user}, "private", {expiresIn: 60 * 60 * 24});
			console.log(jwt);
			return `Bearer ${jwt}`;
		} catch (err) {
			console.log(err);
			return;
		}
	} 

	async userValid(user: IUser, inputPassword: string): Promise<void | Error> {
		const isValid = this.userRepository.authUser({user, password: inputPassword});
		if (isValid) {
			return;
		}
		throw new Error("Invalid email and password combination provided");
	}

	async findUser(email: string): Promise<IUser> {
		return await this.userRepository.findUserByEmail(email);
	}
}