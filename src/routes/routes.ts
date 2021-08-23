import { Router } from "express";

import authenticationRoute from "./authRoutes";

const router = Router();

router.use("/auth" , authenticationRoute);

export default router;