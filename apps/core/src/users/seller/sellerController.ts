import { BodyType, IRequest } from '../../types';

export function getSeller() {
    return 'Hello from Seller';
}

export function postSeller(req: IRequest<BodyType>) {
    const { name, email } = req.body;
    return { seller: { name, email } };
}
