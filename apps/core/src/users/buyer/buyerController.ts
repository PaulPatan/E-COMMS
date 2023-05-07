import * as service from './buyerService';
import jwt from 'jsonwebtoken';
import envResult from '../../utils/env';
import { BuyerDTO, IRequest } from '../../types';

export const getBuyers = async () => {
    return await service.getBuyers();
};

export const getBuyerById = async (req: IRequest) => {
    const id = req.params.id;
    return await service.getBuyerById(id);
};

export async function deleteBuyerById(req: IRequest) {
    const id = req.params.id;
    await service.deleteBuyerById(id);
    return { msg: 'Buyer deleted successfully' };
}

export function loginBuyer(req: IRequest) {
    const body = { _id: req.user?.id, role: req.user?.role };
    const token = jwt.sign({ user: body }, envResult.JWT_SECRET);
    return { token: `Bearer ${token}` };
}

export const putBuyerById = async (req: IRequest<BuyerDTO>) => {
    const id = req.params.id;
    const buyer = req.body;
    await service.putBuyerById(id, buyer);
    return { msg: 'Buyer updated successfully' };
}