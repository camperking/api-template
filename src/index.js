import app from './app.js';
import { dbInit } from './lib/db.js';

const { PORT } = process.env;

dbInit().then(() => {
    app.listen(PORT, err => {
        if (err) throw err;
        console.log('Running on http://localhost:' + PORT);
    });
});