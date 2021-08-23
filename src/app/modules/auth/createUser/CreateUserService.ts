import UserCreationError from "../../../../errors/UserCreationError";
import IUser from "@modules/auth/IUser";
import { ICreateUserRepository} from "@database/auth/CreateUserRepository";

export default class CreateUserService {
	constructor(private createUserRepository: ICreateUserRepository) {}

	async execute(user: IUser): Promise<IUser> {
		const userAlredyExist = await this.createUserRepository.exists(user.email);
		
		if (userAlredyExist) {
			throw new UserCreationError("User alredy already exists");
		}

		const createdUser = await this.createUserRepository.create(user);
		return createdUser;
	}
}
