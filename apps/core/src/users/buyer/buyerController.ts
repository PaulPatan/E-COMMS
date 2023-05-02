import { BodyType } from "../../types";
import { Request } from 'express';


export function getBuyer() {
    return 'Hello from Buyer';
}

export function postBuyer(req: Request) {
    const { name, email } = req.body as BodyType;
    return { 'buyer': { name, email } };
}