import * as express from 'express';

/**
 * Returns a 400-bad request response with custom message
 * @param res The express response
 * @param message The message
 * @returns A Json response
 */
export function badRequest(res: express.Response, message = ''): express.Response<any, Record<string, any>> {
    return res.status(400).json({ success: false, message });
};
