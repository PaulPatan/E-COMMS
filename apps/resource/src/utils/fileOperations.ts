import { Request, Response } from 'express';
import fs from 'fs';
import { Params, Body } from './types';
import pathMethods from 'path';

const isBase64 = (str: string): boolean => {
    const base64Regex =
        /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    return base64Regex.test(str);
};

const checkIfFileExits = (name: string, path: string): boolean => {
    if (fs.existsSync(`${path}/${name}.jpeg`)) {
        return true;
    }
    return false;
};

export const createPath = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
};

export const getImages = (req: Request, res: Response, path: string) => {
    const id: string = req.params.id;
    if (!fs.existsSync(path)) {
        res.status(404).send({
            message: `Requested images with id: ${id} not found!`,
        });
        return;
    }
    fs.readdir(path, (error, files) => {
        if (error) {
            res.sendStatus(500);
        }
        const images = files.map((file) => {
            const filePath = pathMethods.join(path, file);
            return new Promise<string>((resolve, reject) => {
                const stream: fs.ReadStream = fs.createReadStream(filePath);
                const chunks: Buffer[] = [];
                stream.on('data', (chunk: Buffer) => {
                    chunks.push(chunk);
                });
                stream.on('error', (err) => {
                    reject(err);
                });
                stream.on('end', () => {
                    const imageData = `data:image/jpeg;base64,${Buffer.concat(
                        chunks
                    ).toString('base64')}`;
                    resolve(imageData);
                });
            });
        });
        Promise.all(images)
            .then((imageData) => {
                res.send(imageData);
            })
            .catch(() => {
                res.sendStatus(500);
            });
    });
};

export const getImage = (
    req: Request,
    res: Response,
    path: string,
    id: string
): void => {
    if (!checkIfFileExits(id, path)) {
        res.status(404).send({
            message: `Requested image with id: ${id} not found!`,
        });
        return;
    }
    const stream: fs.ReadStream = fs.createReadStream(`${path}/${id}.jpeg`);
    const chunks: Buffer[] = [];
    stream.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
    });
    stream.on('end', () => {
        const imageData = `data:image/jpeg;base64,${Buffer.concat(
            chunks
        ).toString('base64')}`;
        res.send({ avatar: imageData });
    });
};

export const saveOrUpdateImage = (
    req: Request<Params, unknown, Body>,
    res: Response,
    path: string,
    id: string
): void => {
    const file: string = req.body.image;
    if (id === undefined || id === null) {
        res.status(400).send({
            message: 'Incorrect id!',
        });
        return;
    }
    if (!isBase64(file.split(';base64,')[1])) {
        res.status(400).send({
            message: 'The given file base64 format is incorrect!',
        });
        return;
    }
    let statusCode = 201;
    const base64Data: string = file.split(';base64,').pop() || '';
    try {
        if (checkIfFileExits(id, path)) {
            statusCode = 204;
            fs.unlinkSync(`${path}/${id}.jpeg`);
        }
        fs.writeFileSync(`${path}/${id}.jpeg`, base64Data, {
            encoding: 'base64',
        });
    } catch (err) {
        console.log('Saving image went wrong: ', err);
        res.sendStatus(500);
    }
    res.sendStatus(statusCode);
    return;
};

export const deleteImageFolder = (
    req: Request,
    res: Response,
    path: string
): void => {
    const pathToFolder = `${path}/${req.params.id}`;
    if (!fs.existsSync(pathToFolder)) {
        res.status(404).send({
            message: `Requested image with id: ${req.params.id} not found!`,
        });
        return;
    }
    fs.rmSync(pathToFolder, { recursive: true, force: true });
    res.sendStatus(204);
};

export const deleteImage = (
    req: Request,
    res: Response,
    path: string
): void => {
    const id: string = req.params.id;
    if (!checkIfFileExits(id, path)) {
        res.status(404).send({
            message: `Requested image with id: ${id} not found!`,
        });
        return;
    }
    fs.unlinkSync(`${path}/${id}.jpeg`);
    res.sendStatus(204);
};
