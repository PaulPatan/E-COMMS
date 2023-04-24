import { Router } from "express";
import { deleteProductImage, getProductImage, saveOrUpdateProductImage } from "../controller/productImageController";

const router: Router = Router();

router.route('/:id')
    .get(getProductImage)
    .put(saveOrUpdateProductImage)
    .delete(deleteProductImage);

export default router;