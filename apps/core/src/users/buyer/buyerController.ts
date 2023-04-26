import { Request, Response } from "express";
import { BodyType } from "../../types";

export function getBuyer() {
    return 'Hello from Buyer';
}

export  function postBuyer(req: Request) {
    const { name, email } = req.body as BodyType;
    return { 'buyer': { name, email } };
}