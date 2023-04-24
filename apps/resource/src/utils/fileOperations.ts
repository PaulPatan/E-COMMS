import { Request, Response } from "express";
import fs from "fs";
import { Params, Body } from "./types";

const isBase64 = (str: string): boolean => {
    const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    return base64Regex.test(str);
  }
  

const checkIfFileExits = (name: string, path: string): boolean => {
    if (fs.existsSync(`${path}/${name}.jpeg`)) {
        return true;
    }
    return false;
}

export const getImage = (req: Request, res: Response, path: string): void => {
    const id: string = req.params.id;
    if (!checkIfFileExits(id, path)) {
        res.status(404).send({
            message: `Requested image with id: ${id} not found!`
        })
        return;
    }
    const stream: fs.ReadStream = fs.createReadStream(`${path}/${id}.jpeg`);
    res.set('Content-Type', 'image/jpeg');
    stream.pipe(res);
}

export const saveOrUpdateImage = (req: Request<Params, unknown, Body>, res: Response, path: string): void => {
    const id: string = req.params.id;
    const file: string = req.body.image;
    if (id === undefined || id === null) {
        res.status(400).send({
            message: 'Incorrect id!'
        });
        return;
    }
    if (!isBase64(file.split(';base64,')[1])) {
        res.status(400).send({
            message: 'The given file base64 format is incorrect!'
        });
        return;
    }
    let statusCode = 201;
    const base64Data: string = file.split(';base64,').pop();
    try {
        if (checkIfFileExits(id, path)) {
            statusCode = 204;
            fs.unlinkSync(`${path}/${id}.jpeg`);
        }
        fs.writeFileSync(`${path}/${id}.jpeg`, base64Data, { encoding: 'base64'});
    } catch(err) {
        console.log('Saving image went wrong: ', err);
        res.sendStatus(500);
    }
    res.sendStatus(statusCode);
    return;
}

export const deleteImage = (req: Request, res: Response, path: string): void => {
    const id: string = req.params.id;
    if (!checkIfFileExits(id, path)) {
        res.status(404).send({
            message: `Requested image with id: ${id} not found!`
        })
        return;
    }
    fs.unlinkSync(`${path}/${id}.jpeg`);
    res.sendStatus(204);    
}