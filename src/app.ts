import mongoose from 'mongoose';
import express from 'express';
const app = express();
import { getUrl } from './handlers/get-url';
import { createUrl } from './handlers/create-url';
import rateLimit from 'express-rate-limit';

mongoose.connect('mongodb://localhost/mymongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 10
});


app.listen(443);

app.use(express.static('./front-end'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/urls/:url', getUrl);

app.post('/urls', limiter, createUrl);
