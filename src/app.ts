const PORT = process.env.PORT || 443;

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
const app = express();
import { getUrl } from './handlers/get-url';
import { createUrl } from './handlers/create-url';
import rateLimit from 'express-rate-limit';
import { removeUrls } from './handlers/remove-urls';

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/mymongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 10
});


app.listen(PORT);

app.use(express.static('./front-end'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/urls/:url', getUrl);

app.post('/urls', limiter, createUrl);

app.post('/removeUrls',cors(), removeUrls);
