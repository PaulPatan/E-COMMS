import { Request, Response } from 'express';
import { AVATAR_PATH } from '../utils/config';
import {
    deleteImage,
    getImage,
    saveOrUpdateImage,
} from '../utils/fileOperations';
import { Params, Body } from '../utils/types';

export const getAvatar = (req: Request, res: Response): void => {
    getImage(req, res, AVATAR_PATH, req.params.id);
};

export const saveOrUpdateAvatar = (
    req: Request<Params, unknown, Body>,
    res: Response
): void => {
    saveOrUpdateImage(req, res, AVATAR_PATH, req.params.id);
};

export const deleteAvatar = (req: Request, res: Response): void => {
    deleteImage(req, res, AVATAR_PATH);
};
