import polka from 'polka';

import bodyParser from 'body-parser';
import sirv from 'sirv';

import { db } from './lib/db.js';

const dev = process.env.NODE_DEV === 'true';

const app = polka();

export default app; 

app.use(bodyParser.json());
app.use(sirv('static', { dev }));

app.get('/test', (req, res) => {
    res.statusCode = 418;
    res.end('I\'m a teapot');
});

app.post('/test', async (req, res) => {
    const testing = db.collection('testing');

    const user = await testing.insertOne(req.body);

    res.statusCode = 201;
    res.end(JSON.stringify({ id: user.insertedId }));
});