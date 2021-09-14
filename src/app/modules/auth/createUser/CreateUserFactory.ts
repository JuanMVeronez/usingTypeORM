import CreateUserController from "@modules/auth/createUser/CreateUserController";
import { CreateUserRepository } from "@database/auth/CreateUserRepository";
import CreateUserService from "./CreateUserService";

const createUserFactory = (): CreateUserController => {
	const userRepository = new CreateUserRepository("usersRepo");
	const createUser = new CreateUserService(userRepository);
	const createUserController = new CreateUserController(createUser);
	return createUserController;
};

export default createUserFactory;