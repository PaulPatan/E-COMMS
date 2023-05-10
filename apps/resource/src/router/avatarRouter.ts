import { Router } from 'express';
import {
    deleteAvatar,
    getAvatar,
    saveOrUpdateAvatar,
} from '../controller/avatarController';

const router: Router = Router();

router
    .route('/:id')
    .get(getAvatar)
    .put(saveOrUpdateAvatar)
    .delete(deleteAvatar);

export default router;
