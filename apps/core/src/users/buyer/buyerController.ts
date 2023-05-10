import jwt from 'jsonwebtoken';
import { Buyer } from '../../models/users';
import { BuyerDTO, IRequest, RegisterDTO } from '../../types';
import envResult from '../../utils/env';
import { createUser } from '../userProvider';
import * as service from './buyerService';

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

export async function loginBuyer(req: IRequest<RegisterDTO>) {
    const userModel = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
    };
    const buyer = await createUser(userModel, Buyer);
    const body = { _id: buyer.id, role: buyer.role };

    const token = jwt.sign({ user: body }, envResult.JWT_SECRET);
    return { token: `Bearer ${token}` };
}

export const putBuyerById = async (req: IRequest<BuyerDTO>) => {
    const id = req.params.id;
    const buyer = req.body;
    await service.putBuyerById(id, buyer);
    return { msg: 'Buyer updated successfully' };
};
