import mongoose from 'mongoose';
import { mapBuyerModelToDto } from '../../mapper/userMapper';
import { Buyer } from '../../models/users';
import { Filter } from '../../types';
import { checkMongoIdByFilterAndReturnObject } from '../../utils/check';

export const getBuyers = async () => {
    const buyers = await Buyer.find({ role: 'buyer' }, {});
    return buyers.map((buyer) => mapBuyerModelToDto(buyer));
};

export const getBuyerById = async (id: string) => {
    const filter: Filter = {
        _id: id,
        role: 'buyer',
    };
    const buyer = await checkMongoIdByFilterAndReturnObject(
        filter,
        Buyer,
        'Buyer'
    );
    return mapBuyerModelToDto(buyer);
};

export const deleteBuyerById = async (id: string) => {
    const filter: Filter = {
        _id: id,
        role: 'buyer',
    };
    await checkMongoIdByFilterAndReturnObject(filter, Buyer, 'Buyer');
    await Buyer.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

export const putBuyerById = async (id: string, buyer: any) => {
    const filter: Filter = {
        _id: id,
        role: 'buyer',
    };
    await checkMongoIdByFilterAndReturnObject(filter, Buyer, 'Buyer');
    await Buyer.updateOne({ _id: new mongoose.Types.ObjectId(id) }, buyer);
};
