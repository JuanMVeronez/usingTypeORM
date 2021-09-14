import bcrypt from "bcrypt";
import { getRepository, Repository } from "typeorm";

import IUser from "@modules/auth/IUser";
import { User } from "@models/Users";

export interface ICreateUserRepository {
  exists(id: string): Promise<boolean>
  create(user: IUser): Promise<IUser>
	findUserByEmail(email: string): Promise<IUser>
	authUser(loginData : {user: IUser; password: string}): Promise<boolean>
}

export class CreateUserRepository implements ICreateUserRepository {
	private repository: Repository<User>;

	constructor(repoName: string) {
		this.repository = getRepository(User, repoName);
	}
  
	async exists(email: string): Promise<boolean> {
		const user = await this.repository.findOne({ email});
		return !!user;
	}
  
	async create(user: IUser): Promise<IUser> {
		user.isValid = false;

		const createdUser = this.repository.create(user);
		await this.repository.save(createdUser);

		return createdUser;
	}

	async findUserByEmail(email: string): Promise<IUser> {
		return await this.repository.findOneOrFail({email});
	}
	
	async authUser({user, password}: {user: IUser, password: string}): Promise<boolean> {
		return await bcrypt.compare(password, user.password);
	}
}