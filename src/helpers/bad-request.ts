import * as express from 'express'
export function badRequest(res: express.Response, message = '') {
    return res.status(400).json({ success: false, message });
};
