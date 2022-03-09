import express from 'express';
import { ShortUrl } from '../models/short-url';

const MAX_URL_LENGTH = 2048;

/**
 * Creates a short url for the url provided
 * if the url already exists then it returns it
 * @param req The express request
 * @param res The express response
 * @returns A Json object
 */
export async function createUrl(
    req: express.Request,
    res: express.Response
): Promise<express.Response<any, Record<string, any>>> {
    const url = req.body.url as string;
    if (url.length > MAX_URL_LENGTH || url.length < 1) {
        // Too long url
        return res.status(400).json({ success: false, message: `Url must be between 1 and 2048 characters!` });
    }
    try {
        // find url
        const result = (await ShortUrl.find({ full: url }))[0];
        if (result) {
            return res.status(200).json({ success: true, message: 'Already exists', url: result });
        }
        const newUrl = await ShortUrl.create({ full: url });
        return res.status(201).json({ success: true, message: 'Created', url: newUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: `Something went wrong.` });
    }
}
