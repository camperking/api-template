import polka from 'polka';

import bodyParser from 'body-parser';
import sirv from 'sirv';

const dev = process.env.NODE_DEV === 'true';

const app = polka();

export default app; 

app.use(bodyParser.json());
app.use(sirv('static', { dev }));

app.get('/test', (req, res) => {
    res.statusCode = 418;
    res.end('I\'m a teapot');
});