import { APIError } from '@e-comms/shared/errors';
import ejs from 'ejs';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { mapSellerModelToDto } from '../../mapper/userMapper';
import { Seller } from '../../models/users';
import { Filter, Invoice } from '../../types';
import { checkMongoIdByFilterAndReturnObject } from '../../utils/check';
import Env from '../../utils/env';

export const getSellers = async () => {
    const sellers = await Seller.find({ role: 'seller' }, {});
    const dtos = sellers.map((seller) => mapSellerModelToDto(seller));
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
    const dto = mapSellerModelToDto(seller);
    const res = await fetch(`${Env.RESOURCE_HOST}/avatar/${dto._id}`, {
        method: 'GET',
    });
    const data = await res.json();
    dto.avatar = data.avatar;
    return dto;
};

export const deleteSellerById = async (id: string) => {
    const filter: Filter = {
        _id: id,
        role: 'seller',
    };
    await checkMongoIdByFilterAndReturnObject(filter, Seller, 'Seller');
    await Seller.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    await fetch(`${Env.RESOURCE_HOST}/avatar/${id}`, {
        method: 'DELETE',
    });
};

export const putSellerById = async (id: string, seller: any) => {
    const filter: Filter = {
        _id: id,
        role: 'seller',
    };
    await checkMongoIdByFilterAndReturnObject(filter, Seller, 'Seller');
    await Seller.updateOne({ _id: new mongoose.Types.ObjectId(id) }, seller);
    const res = await fetch(`${Env.RESOURCE_HOST}/avatar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: seller.avatar }),
    });
    if (res.status === 400) {
        throw new APIError(400, { error: `Wrong base64 format for images!` });
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${Env.GMAIL}`,
        pass: `${Env.GMAIL_PASS}`,
    },
});

export const sendInvoiceEmail = async (to: string, invoice: Invoice) => {
    const html = await ejs.renderFile('./src/utils/invoice.ejs', { invoice });
    const mailOptions = {
        from: Env.EMAIL_SENDER,
        to,
        subject: 'Invoice',
        html,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            throw new APIError(500, {
                message: `Error sending email: ${error}`,
            });
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
