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
