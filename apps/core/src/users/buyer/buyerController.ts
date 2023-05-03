import { BodyType, IRequest } from '../../types';

export function getBuyer() {
    return 'Hello from Buyer';
}

export function postBuyer(req: IRequest<BodyType>) {
    const { name, email } = req.body;
    return { buyer: { name, email } };
}
