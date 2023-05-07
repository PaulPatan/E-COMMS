import mongoose from 'mongoose';
import { mapSellerModelToDto } from '../../mapper/userMapper';
import { Seller } from '../../models/users';
import { Filter } from '../../types';
import { checkMongoIdByFilterAndReturnObject } from '../../utils/check';

export const getSellers = async () => {
    const sellers = await Seller.find({ role: 'seller' }, {});
    return sellers.map((seller) => mapSellerModelToDto(seller));
};

export const getSellerById = async (id: string) => {
    const filter: Filter = {
        _id: id,
        role: 'seller',
    };
    const seller = await checkMongoIdByFilterAndReturnObject(
        filter,
        Seller,
        'Seller'
    );
    return mapSellerModelToDto(seller);
};

export const deleteSellerById = async (id: string) => {
    const filter: Filter = {
        _id: id,
        role: 'seller',
    };
    await checkMongoIdByFilterAndReturnObject(filter, Seller, 'Seller');
    await Seller.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

export const putSellerById = async (id: string, seller: any) => {
    const filter: Filter = {
        _id: id,
        role: 'seller',
    };
    await checkMongoIdByFilterAndReturnObject(filter, Seller, 'Seller');
    await Seller.updateOne({ _id: new mongoose.Types.ObjectId(id) }, seller);
}