import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { BodyType, IRequest } from '../../types';
import envResult from '../../utils/env';

export function getBuyer() {
    return 'Hello from Buyer';
}

export function postBuyer(req: IRequest<BodyType>) {
    const { name, email } = req.body;
    return { buyer: { name, email } };
}

export function loginBuyer(req: Request) {
    const body = { _id: req.user?.id, role: req.user?.role };
    const token = jwt.sign({ user: body }, envResult.JWT_SECRET);
    return { token: `Bearer ${token}` };
}
