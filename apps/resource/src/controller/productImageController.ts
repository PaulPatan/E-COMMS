import { Request, Response } from 'express';
import short from 'short-uuid';
import { IMAGE_PATH } from '../utils/config';
import {
    createPath,
    deleteImageFolder,
    getImages,
    saveOrUpdateImage,
} from '../utils/fileOperations';
import { Params, Body } from '../utils/types';

export const getProductImages = (req: Request, res: Response): void => {
    getImages(req, res, `${IMAGE_PATH}/${req.params.id}`);
};

export const saveOrUpdateProductImage = (
    req: Request<Params, unknown, Body>,
    res: Response
): void => {
    createPath(`${IMAGE_PATH}/${req.params.id}`);
    saveOrUpdateImage(
        req,
        res,
        `${IMAGE_PATH}/${req.params.id}`,
        short.generate()
    );
};

export const deleteProductImage = (req: Request, res: Response): void => {
    deleteImageFolder(req, res, IMAGE_PATH);
};
