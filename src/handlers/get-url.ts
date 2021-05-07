import express from 'express';
import { badRequest } from '../helpers/bad-request';
import { ShortUrl } from '../models/short-url';

/**
 * Retrieves the url from the database
 * if it exists then redirects the user to that url
 * if not it returns a bad request object
 * @param req The express request
 * @param res The express respons
 * @returns A bad request json object or void (redirect)
 */
export async function getUrl(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>> | void> {
    const url = req.params.url;
    if (!url) {
        return badRequest(res, `You didn't provide an url!`);
    }
    try {
        const shortUrls = await ShortUrl.find({ short: url });
        const match = shortUrls[0];
        if (!match) {
            return badRequest(res, `The url you provided is not registered in the database.`);
        }
        await ShortUrl.updateOne({ short: match.short }, { clicks: match.clicks + 1 });
        return res.redirect(match.full);
    } catch (error) {
        console.error(error);
        return res.status(501).json({ success: false, message: `Something went wrong!` })
    }

}

