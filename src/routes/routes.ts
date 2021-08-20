import { Router } from "express";

import authenticationRoute from "./authenticationRoute";

const router = Router();

router.use("/auth" , authenticationRoute);

export default router;