import IUser from "@modules/authentication/IUser";
import CreateUserService from "@modules/authentication/createUser/CreateUserService";
import { Request, Response } from "express";
import UserCreationError from "src/errors/UserCreationError";

export default class CreateUserController {
	constructor(private createUser: CreateUserService) {}

	async handle(req: Request, res: Response) {
		const user: IUser = req.body.user;
		try {
			const creationResult = await this.createUser.execute(user);

			return res.json(creationResult);
		
		} catch (err) {
			if (err instanceof UserCreationError) {
				return res.status(406).json({error: err.message});
			}
			
			return res.status(500).send({error: "unexpected error."});
		}
	}
}