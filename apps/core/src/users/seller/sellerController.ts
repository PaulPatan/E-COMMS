import { Request, Response } from "express";
import { BodyType } from "../../types";


export function getSeller() {
    return 'Hello from Seller';
}

export function postSeller(req: Request) {
    const { name, email } = req.body as BodyType;
    return ({ 'seller': { name, email } });
}