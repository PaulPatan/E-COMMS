import { Request, Response } from "express";
import { AVATAR_PATH } from "../utils/config";
import { deleteImage, getImage, saveOrUpdateImage } from "../utils/fileOperations";
import { Params, Body } from "../utils/types";

export const getAvatar = (req: Request, res: Response): void => {
    void getImage(req, res, AVATAR_PATH);
}

export const saveOrUpdateAvatar = (req: Request<Params, unknown, Body>, res: Response): void => {
    void saveOrUpdateImage(req, res, AVATAR_PATH);
}

export const deleteAvatar = (req: Request, res: Response): void => {
    void deleteImage(req, res, AVATAR_PATH);
}
