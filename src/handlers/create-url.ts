import { ShortUrl } from '../models/short-url';

export async function createUrl(req: any, res: any) {
    const url = req.body.url as string;
    if (url.length > 2048) {
        // Too long url
        return res.status(400).json({ success: false, message: `Url is too long` });
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
        return res.status(501).json({ success: false, message: `Something went wrong.` });
    }

}
