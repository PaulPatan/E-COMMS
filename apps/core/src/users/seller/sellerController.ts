import { IRequest, SellerDTO } from '../../types';
import * as service from './sellerService';

export const getSellers = async () => {
    return await service.getSellers();
};

export const getSelleryById = async (req: IRequest) => {
    const id = req.params.id;
    return await service.getSellerById(id);
};

export const deleteSellerById = async (req: IRequest) => {
    const id = req.params.id;
    await service.deleteSellerById(id);
    return { msg: 'Seller deleted successfully' };
};

export const putSellerById = async (req: IRequest<SellerDTO>) => {
    const id = req.params.id;
    const seller = req.body;
    await service.putSellerById(id, seller);
    return { msg: 'Seller updated successfully' };
}