import express from 'express';
import { ShortUrl } from '../models/short-url';


export async function getUrls(req: express.Request, res: express.Response): Promise<any> {
    try {
        const urls = await ShortUrl.find();
        return res.status(200).json({ success: true, message: `Ok`, urls });
    } catch (error) {
        console.error(error);
        return res.status(501).json({ success: false, message: `Something went wrong!` });
    }
}

