import { Request, Response } from "express";
import { BodyType } from "../../types";
import {APIError} from '@e-comms/shared/errors';
// import { APIError } from '@shared/errors';


export function getAdmin(req: Request) {
    if (req.method !== 'GET') {
        throw new APIError(404, { msg: "Method not allowed" }); // <APIError> new error type witch extends Error class
    }
    return 'Hello from Admin';
}

export function postAdmin(req: Request) {
    const { name, email } = req.body as BodyType;
    return { 'admin': { name, email } };
}