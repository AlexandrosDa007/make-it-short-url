import express from 'express';
import { ShortUrl } from '../models/short-url';
export async function removeUrls(req: express.Request, res: express.Response): Promise<any> {
    const deleteKey = req.body.deleteKey;
    console.log('Delete key', deleteKey);
    console.log('ENV key', process.env.DELETE_KEY);
    

    console.log('THe same', (deleteKey === process.env.DELETE_KEY));
    

    if (deleteKey !== process.env.DELETE_KEY) {
        return res.status(403).json({ success: false, message: 'NOT AUTHORIZED' });
    }

    // Get 30 days ago
    const now = Date.now();
    const thirtyDaysAgo = now - 2592000000;
    // find
    try {
        const { deletedCount } = await ShortUrl.deleteMany().where('timestamp').lt(thirtyDaysAgo);
        return res.status(200).json({ success: true, message: `Removed ${deletedCount ?? 0}` })
    } catch (error) {
        console.error(error);
        return res.status(501).json({ success: false, message: 'Something went wrong!' });
    }

}
