import { APIError } from '@e-comms/shared/errors';
import mongoose from 'mongoose';
import { mapBuyerModelToDto } from '../../mapper/userMapper';
import { Buyer } from '../../models/users';
import { Filter } from '../../types';
import { checkMongoIdByFilterAndReturnObject } from '../../utils/check';
import Env from '../../utils/env';

export const getBuyers = async () => {
    const buyers = await Buyer.find({ role: 'buyer' }, {});
    const dtos = buyers.map((buyer) => mapBuyerModelToDto(buyer));
    const responses = await Promise.all(
        dtos.map((dto) => {
            return fetch(`${Env.RESOURCE_HOST}/avatar/${dto._id}`, {
                method: 'GET',
            });
        })
    );
    const images = await Promise.all(
        responses.map((res) => {
            return res.json();
        })
    );
    dtos.forEach((dto, index) => {
        if (responses[index].status < 400) {
            dto.avatar = images[index].avatar;
        } else {
            dto.avatar = '';
        }
    });
    return dtos;
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
    const dto = mapBuyerModelToDto(buyer);
    const res = await fetch(`${Env.RESOURCE_HOST}/avatar/${dto._id}`, {
        method: 'GET',
    });
    const data = await res.json();
    dto.avatar = data.avatar;
    return dto;
};

export const deleteBuyerById = async (id: string) => {
    const filter: Filter = {
        _id: id,
        role: 'buyer',
    };
    await checkMongoIdByFilterAndReturnObject(filter, Buyer, 'Buyer');
    await Buyer.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    await fetch(`${Env.RESOURCE_HOST}/avatar/${id}`, {
        method: 'DELETE',
    });
};

export const putBuyerById = async (id: string, buyer: any) => {
    const filter: Filter = {
        _id: id,
        role: 'buyer',
    };
    await checkMongoIdByFilterAndReturnObject(filter, Buyer, 'Buyer');
    await Buyer.updateOne({ _id: new mongoose.Types.ObjectId(id) }, buyer);
    const res = await fetch(`${Env.RESOURCE_HOST}/avatar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: buyer.avatar }),
    });
    if (res.status === 400) {
        throw new APIError(400, { error: `Wrong base64 format for images!` });
    }
};
