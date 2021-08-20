import createUserFactory from "@modules/authentication/createUser/CreateUserFactory";
import { Router } from "express";

const router = Router();

router.post("/create", (req, res) => createUserFactory().handle(req, res));

export default router;