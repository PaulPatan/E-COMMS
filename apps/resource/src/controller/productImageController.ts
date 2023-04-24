import { Request, Response } from "express";
import { IMAGE_PATH } from "../utils/config";
import { deleteImage, getImage, saveOrUpdateImage } from "../utils/fileOperations";
import { Params, Body } from "../utils/types";

export const getProductImage = (req: Request, res: Response): void => {
    getImage(req, res, IMAGE_PATH);
}

export const saveOrUpdateProductImage = (req: Request<Params, unknown, Body>, res: Response): void => {
    void saveOrUpdateImage(req, res, IMAGE_PATH);
}

export const deleteProductImage = (req: Request, res: Response): void => {
    void deleteImage(req, res, IMAGE_PATH);
}

