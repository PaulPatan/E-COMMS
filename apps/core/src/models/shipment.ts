import { Schema, model, connect, Types } from 'mongoose';

type TShipment = {
    id: Types.ObjectId;
    buyerId: Types.ObjectId;
    products: string[];
    totalPrice: number;
    address: {
        postCode: number
        street: string
        city: string
    }
}

const shipmentSchema = new Schema<TShipment>({
    buyerId: { type: Schema.Types.ObjectId, ref: 'users', required:true },
    products: { type: [String], ref:'Cart', required:true },
    totalPrice: { type: Number },
    address: {
        postCode: { type: Number, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true }
    }
})

export const Shipment = model<TShipment>('Shipment', shipmentSchema);