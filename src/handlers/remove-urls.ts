import express from 'express';
import { ShortUrl } from '../models/short-url';


/**
 * Removes urls that have been created more than 30days
 * ago. Its only authorized by a specific deleteKey.
 * @param req The express request
 * @param res The express response
 * @returns A json object
 */
export async function removeUrls(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>> {
    const deleteKey = req.body.deleteKey;

    if (deleteKey !== process.env.DELETE_KEY) {
        return res.status(403).json({ success: false, message: 'NOT AUTHORIZED' });
    }

    // Get 30 days ago
    const now = Date.now();
    const thirtyDaysAgo = now - 2592000000;
    try {
        const { deletedCount } = await ShortUrl.deleteMany().where('timestamp').lt(thirtyDaysAgo);
        return res.status(200).json({ success: true, message: `Removed ${deletedCount ?? 0}` })
    } catch (error) {
        console.error(error);
        return res.status(501).json({ success: false, message: 'Something went wrong!' });
    }

}
