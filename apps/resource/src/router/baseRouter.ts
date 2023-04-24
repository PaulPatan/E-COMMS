import { Router } from "express";
import avatarRouter from "./avatarRouter";
import imageRouter from "./productImageRouter"

const router: Router = Router();

router.use('/avatar', avatarRouter);
router.use('/image', imageRouter);

export default router;