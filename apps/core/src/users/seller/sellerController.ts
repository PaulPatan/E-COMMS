import { IRequest, Invoice, SellerDTO } from '../../types';
import { getBuyerById } from '../buyer/buyerService';
// import { generateInvoice } from './sellerProvider';
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
};

export const sendInvoiceEmail = async (req: IRequest) => {
    const id = req.params.clientId;
    const buyer = await getBuyerById(id);
    // const invoice = await generateInvoice(id);
    const invoice: Invoice = {
        id: '1',
        items: [
            {
                description: 'item 1',
                price: 100,
            },
            {
                description: 'item 2',
                price: 200,
            }
        ],
        total: 300,
    };
    await service.sendInvoiceEmail(buyer.email, invoice);
    return { msg: 'Invoice sent successfully' };
};
