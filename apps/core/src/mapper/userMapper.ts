import { TBuyer, TSeller } from '../models/users';

export const mapBuyerModelToDto = (model: TBuyer) => {
    return {
        _id: model._id?.toHexString(),
        firstName: model.firstName,
        lastName: model.lastName,
        address: model.address,
        favorites: model.favorites,
        creditCardInfo: model.creditCardInfo,
    };
};

export const mapSellerModelToDto = (model: TSeller) => {
    return {
        _id: model._id?.toHexString(),
        firstName: model.firstName,
        lastName: model.lastName,
        email: model.email,
        role: model.role,
        creditCardInfo: model.creditCardInfo,
    };
};
