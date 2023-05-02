import { BodyType } from "../../types";
import { Request } from 'express';

export function getSeller() {
    return 'Hello from Seller';
}

export function postSeller(req: Request) {
    const { name, email } = req.body as BodyType;
    return ({ 'seller': { name, email } });
}