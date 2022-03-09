import { Schema, model, Document } from 'mongoose';
import { generate } from 'shortid';

export interface IShortUrl extends Document {
    full: string;
    short?: string;
    clicks?: number;
    timestamp?: number;
}

export const shortUrlSchema = new Schema({
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
        default: generate,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    timestamp: {
        type: Number,
        default: Date.now(),
    }
});

export const ShortUrl = model<IShortUrl>('ShortUrl', shortUrlSchema);
