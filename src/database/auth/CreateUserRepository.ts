import { getRepository, Repository } from "typeorm";

import IUser from "@modules/auth/IUser";
import { User } from "@models/Users";

export interface ICreateUserRepository {
  exists(id: string): Promise<boolean>
  create(user: IUser): Promise<IUser>
}

export class CreateUserRepository implements ICreateUserRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = getRepository(User);
	}
  
	async exists(id: string): Promise<boolean> {
		const user = await this.repository.findOne(id);
		return !!user;
	}
  
	async create(user: IUser): Promise<IUser> {
		user.isValid = false;

		const createdUser = this.repository.create(user);
		await this.repository.save(user);

		return createdUser;
	}
}