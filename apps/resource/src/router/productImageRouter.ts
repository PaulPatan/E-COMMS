import { Router } from 'express';
import {
    deleteProductImage,
    getProductImages,
    saveOrUpdateProductImage,
} from '../controller/productImageController';

const router: Router = Router();

router
    .route('/:id')
    .get(getProductImages)
    .put(saveOrUpdateProductImage)
    .delete(deleteProductImage);

export default router;
